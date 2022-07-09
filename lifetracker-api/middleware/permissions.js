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

const authedUserOwnsNutritionList = async (req, res, next) => {
    try{
        const {user} = res.locals
        const nutrition = await Nutrition.listNutritionForUser(user)
        

        if (nutrition[0].userEmail != user.email){
            throw new ForbiddenError("User is not allowed to access other users' nutrition list")
        }

        res.locals.nutritionList = nutrition

        return next()
    }catch(err){
        return next(err)
    }
}

module.exports = {
    authedUserOwnsNutrition,
    authedUserOwnsNutritionList
}