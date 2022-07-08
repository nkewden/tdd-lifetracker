const express = require("express");
const router = express.Router();
const Nutrition = require("../models/nutrition");
const security = require("../middleware/security")



router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        const {user} = res.locals
        const nutrition = await Nutrition.createNutrition({user, info: req.body})
        return res.status(201).json({nutrition})
    }catch(err){
        next(err)
    }
})

router.get("/id/:nutritionId", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async(req, res, next) => {
    try{
        const nutrition = await Nutrition.fetchNutritionById(Number(req.params.nutritionId))
        return res.status(200).json({nutrition})
    }catch(err){
        next(err)
    }
})


module.exports = router;