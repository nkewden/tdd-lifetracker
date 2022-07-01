const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
// const { PORT } = require("./config")
const authRoutes = require("./routes/auth")
const { BadRequestError, NotFoundError } = require("./utils/errors")
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

const PORT = process.env.PORT || 3001
 
app.listen(PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`)
})