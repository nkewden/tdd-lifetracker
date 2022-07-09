const Nutrition = require("../models/nutrition.js")
const {ForbiddenError, BadRequestError} = require("../utils/errors")

const authedUserOwnsNutrition = async (req, res, next) => {
    try {
        const {user} = res.locals
        const {nutritionId} = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)

        if (nutrition.email != user.email){
            throw new ForbiddenError("Can't access this nutrition")
        }

        res.locals.nutrition = nutrition
        return next()
    }catch(error) {
        return next(error)
    }
}



module.exports = {
    authedUserOwnsNutrition,
}