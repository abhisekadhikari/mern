// import packages
const express = require("express")

// import local packages
const apiRouter = require("./routes/api.routes")
const AppError = require("./utils/AppError")

// init. express app

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// api routes
app.use("/api", apiRouter)

app.use((err, req, res, next) => {
    console.log(err)

    if (err instanceof AppError)
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.error,
        })
    res.status(500).json({
        success: false,
        error: "Internal Server Error",
    })
})

module.exports = app
