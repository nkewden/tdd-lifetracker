const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth")
const { NotFoundError, BadRequestError} = require("./utils/errors")
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

app.use("/auth", authRoutes)

app.get("/", async(req, res, next) => {
    res.status(200).json({ ping: "pong"})
})

app.use((req, res, next) => {
    return next(new NotFoundError())
})


app.use((req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status},
    })
})

module.exports = app