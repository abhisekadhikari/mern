// Import required packages
const express = require("express")

// Import local modules
const apiRouter = require("./routes/api.routes")
const AppError = require("./utils/AppError")

// Initialize Express application
const app = express()

// Middleware for parsing incoming JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Mount API routes under "/api" prefix
app.use("/api", apiRouter)

// Global error handling middleware
app.use((err, req, res, next) => {
    console.log(err) // Log the error for debugging

    // Handle custom application errors
    if (err instanceof AppError)
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.error,
        })

    // Handle unexpected server errors
    res.status(500).json({
        success: false,
        error: "Internal Server Error",
    })
})

module.exports = app
