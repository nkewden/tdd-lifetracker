const express = require("express");
const router = express.Router();
const Nutrition = require("../models/nutrition");
const User = require("../models/user");


router.post("/", async (req,res,next) => {
    console.log(req.body)
    try {
        const makeNutrition = await Nutrition.createNutrition(req.body.data);
        const user = await User.fetchUserByEmail(req.body.data.email);
        const nutrition = await Nutrition.listNutritionForUser(user.id);
        return res.status(200).json({ nutrition });
    }
    catch(err){
        next(err);
    }
})

module.exports = router;