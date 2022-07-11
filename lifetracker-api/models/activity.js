const { BadRequestError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Activity {
    static async calculateDailyCaloriesSummaryStats (user) {
        if(!user) {
            throw new BadRequestError("Provide user")
        }

        const query = `
        SELECT to_char(n.created_at, 'dd-MM-yy') AS date,
            SUM(n.calories) 
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id 
            WHERE u.email = $1
            GROUP BY date
            ORDER BY date DESC;
        `

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const activity = result.rows

        return activity
    }

    static async calculatePerCategoryCaloriesSummaryStats (user) {
        if(!user) {
            throw new BadRequestError("Provide user")
        }

        const query = `
            SELECT n.category,
            CAST(AVG(n.calories) AS DECIMAL(10,1)) AS "avgCaloriesPerCategory"
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id 
            WHERE u.email = $1
            GROUP BY n.category;
        `

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const activity = result.rows

        return activity
    }

}

module.exports = Activity