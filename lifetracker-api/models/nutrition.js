const db = require("../db");
const { BadRequestError} = require("../utils/errors");

class Nutrition {
    static async createNutrition({user, post}) {
        const requiredFields = ["name", "category", "calories", "image_url","quantity"]
        requiredFields.forEach(field => {
            if (!post.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })
        console.log(user.email)
        const result = await db.query(
            
            `INSERT INTO nutrition (user_id, name, category, quantity, calories, image_url)
            VALUES ((SELECT id FROM users WHERE email = $1), $2, $3, $4, $5, $6)
            RETURNING id,
                    user_id AS "userId",
                    name,
                    category,
                    quantity,
                    calories,
                    image_url AS "imageUrl",
                    created_at AS "createdAt"`
            , 
            [user.email, post.name, post.category, post.quantity, post.calories, post.image_url]
        )
        return result.rows[0]
    }

    static async fetchNutritionById(id){
        if(!id) {
            throw new BadRequestError("Please provide ID")
        }
        const query = ( `SELECT 
            n.id,
            n.name,
            n.category,
            n.calories,
            n.image_url,
            n.user_id,
            n.created_at,
            n.quantity,
            u.email
            
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id
            WHERE n.id = $1`)
        

        const result = await db.query(query, [id])

        const nutrition = result.rows[0]
        if(!nutrition){
            throw new NotFoundError
        }
        return nutrition
    }

    static async listNutritionForUser(){
        const query = `
        SELECT 
        n.id,
        n.name,
        n.category,
        n.calories,
        n.image_url,
        n.user_id,
        n.created_at,
        n.quantity,
        u.email
        
        FROM nutrition AS n
            LEFT JOIN users AS u ON u.id = n.user_id
        ORDER by n.created_at DESC`

        const result = await db.query(query)

        if(!result){
            throw new NotFoundError
        }

        const nutrition = result.rows

        return nutrition
    }
}

module.exports = Nutrition