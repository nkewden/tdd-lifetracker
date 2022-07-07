const { UnauthorizedError, BadRequestError } = require("../utils/errors")
const db = require("../db")
const { c } = require("tar")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")

class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            created_at: user.created_at
        }
    }
    
    static async login (credentials) {
        const requireFields = ["email", "password"]
        requireFields.forEach((field) => {
            if (!credentials?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        }) 

        const user = await User.fetchUserByEmail(credentials.email)
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            }
        }

        throw new UnauthorizedError("Invalid email/password")
    }

    static async register (credentials) {
        const requireFields = ["email", "username", "first_name", "last_name", "password", "confirmPassword"]
        requireFields.forEach((field) => {
            if (!credentials?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        }) 

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }

        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
          throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
        }
    
        const existingUserWithUsername = await User.fetchUserByUsername(credentials.username)
        if (existingUserWithUsername) {
          throw new BadRequestError(`A user already exists with username: ${credentials.username}`)
        }
        
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        const lowercasedEmail = credentials.email.toLowerCase()
        const lowercasedUsername = credentials.username.toLowerCase()

        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        const result = await db.query(`
            INSERT INTO users (
                email,
                username,
                first_name,
                last_name,
                password,
                confirmPassword
                
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, username, first_name, last_name, updated_at, created_at;
        `, [lowercasedEmail, lowercasedUsername, credentials.first_name, credentials.last_name, hashedPassword])

        const user = result.rows[0]

        return User.makePublicUser(user)
    }

    static async fetchUserByEmail(email) {
        if (!email) {  
            throw new BadRequestError("No email provided")
        }

        const query =  `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }

    static async fetchUserByUsername(username) {
        if (!username) {
          throw new BadRequestError("No username provided")
        }
    
        const query = `SELECT * FROM users WHERE username = $1`
    
        const result = await db.query(query, [username.toLowerCase()])
    
        const user = result.rows[0]
    
        return user
      }
}

module.exports = User