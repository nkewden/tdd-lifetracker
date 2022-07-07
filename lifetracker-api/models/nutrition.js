const db = require("../db");
const User = require("../models/user");
const { BadRequestError} = require("../utils/errors");

class Nutrition {
    static async createNutrition({nutritions, user}) {
        const requireFields = ["name", "category", "calories", "quantity", "image_url"]

        requireFields.forEach((field) => {
            if (!nutritions?.hasOwnProperty(field)) {
                throw new BadRequestError(`Required ${field} missing from request body`)
            }
        }) 

        const result = await db.query (
            `INSERT INTO nutrition (
                name,
                catergory,
                calories,
                quantity,
                image_url,
                user_id
                
            )
            VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
            RETURNING id, name, category, quantity, calories, image_url, created_at, user_id;
            `,
            [nutritions.name, nutritions.catergory, nutritions.quantity, nutritions.calories, nutritions.image_url, user.email]
        )

        return result.rows[0]

    }
}

module.exports = Nutrition