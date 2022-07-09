const express = require("express");
const router = express.Router();
const Nutrition = require("../models/nutrition");
const permissions = require("../middleware/permissions")
const security = require("../middleware/security")


router.get("/", security.requireAuthenticatedUser, async(req, res, next) => {
    try{
        const nutrition = await Nutrition.listNutritionForUser()
        return res.status(200).json({nutrition})
    }catch(err){
        next(err)
    }
})


router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // create a nutrition post
        const { user } = res.locals
        console.log(user)
        const post = await Nutrition.createNutrition({ user, post: req.body})
        return res.status(201).json({post})
    } catch(err) {
        next(err)
    }
})


router.get("/id/:nutritionId", security.requireAuthenticatedUser, async(req, res, next) => {
    try{
        const {nutritionId} = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        return res.status(200).json({nutrition})
    }catch(err){
        next(err)
    }
})


module.exports = router;