const express = require("express");
const router = express.Router();
const { createUserJwt } = require("../utils/tokens");
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


module.exports = router;