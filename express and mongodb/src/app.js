// import packages
const path = require("path")
require("dotenv").config({
    debug: true,
    path:
        process.env.NODE_ENV === "dev"
            ? path.resolve(".env.dev")
            : path.resolve(".env"),
})
const express = require("express")

// import local packages
const apiRouter = require("./routes/api.routes")
const AppError = require("./utils/AppError")

// init. express app

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", apiRouter)

app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.error,
        })
    }
})

module.exports = app
