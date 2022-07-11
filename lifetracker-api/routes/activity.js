const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Activity = require("../models/activity")

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        const {user} = res.locals
        const perDay = await Activity.calculateDailyCaloriesSummaryStats(user)
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(user)
        return res.status(200).json({perDay, perCategory})
    } catch(err){
        next(err)
    }
})

module.exports = router