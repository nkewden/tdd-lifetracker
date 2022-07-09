const express = require("express")
const User = require("../models/user")
const router = express.Router()
const {createUserJwt} = require("../utils/tokens")
const security = require("../middleware/security")

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ user, token })
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({user, token})
    } catch(err) {
        next(err)
    }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const {email} = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name}
        return res.status(200).json({user: publicUser})
    }catch(error){
        next(error)
    }
})


module.exports = router