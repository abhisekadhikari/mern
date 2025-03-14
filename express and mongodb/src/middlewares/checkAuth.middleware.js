const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const envConfig = require("../config/env.config")

const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(
                403,
                "Unauthorized",
                "Access token is missing or invalid."
            )
        }

        const token = authHeader.split(" ")[1]

        const user = jwt.verify(token, envConfig.JWT_SECRET)
        if (!user) {
            throw new AppError(403, "Unauthorized", "Invalid token.")
        }

        req.user = user // Attach user data to the request for further use
        next()
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === "JsonWebTokenError") {
            return next(new AppError(403, "Unauthorized", "Invalid token."))
        } else if (error.name === "TokenExpiredError") {
            return next(
                new AppError(
                    401,
                    "Unauthorized",
                    "Token has expired. Please log in again."
                )
            )
        }

        return next(
            new AppError(
                500,
                "Authentication Error",
                "An error occurred during authentication."
            )
        )
    }
}

module.exports = checkAuth
