const db = require("../db");
const { BadRequestError, NotFoundError} = require("../utils/errors");

class Nutrition {
    static async createNutrition({data, user}){
        const requiredFields = ["name", "category", "calories", "imageUrl", "quantity"]
        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const result = await db.query(`INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            quantity,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
        RETURNING id, name, category, calories, created_at, image_url, user_id, quantity;
        `, [data.name, data.category, data.calories, data.imageUrl, user.email, data.quantity])

        const nutritionData = result.rows[0]

        return nutritionData
    }

    static async fetchNutritionById(id){
        if(!id) {
            throw new BadRequestError("Please provide ID")
        }
        const query = `
        SELECT 
        nutri.id,
        nutri.name,
        nutri.category,
        nutri.calories,
        nutri.image_url,
        nutri.user_id,
        nutri.created_at,
        nutri.quantity,
        user.email
        
        FROM nutrition AS nutri
            LEFT JOIN users AS user ON user.id = nutri.user_id
        WHERE nutri.id = $1`

        const result = await db.query(query, [id])

        const nutrition = result.rows[0]
        if(!nutrition){
            throw new NotFoundError
        }
        return nutrition
    }

    static async listNutritionForUser(user){
        if(!user) {
            throw new BadRequestError("Please provide ID")
        }
        const query = `
        SELECT 
        nutri.id,
        nutri.name,
        nutri.category,
        nutri.calories,
        nutri.image_url,
        nutri.user_id,
        nutri.created_at,
        nutri.quantity,
        user.email
        
        FROM nutrition AS nutri
            LEFT JOIN users AS user ON user.id = nutri.user_id
        WHERE nutri.id = $1`

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const nutrition = result.rows

        return nutrition
    }
}

module.exports = Nutrition