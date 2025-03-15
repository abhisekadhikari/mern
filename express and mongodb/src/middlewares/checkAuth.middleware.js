const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const envConfig = require("../config/env.config")

/**
 * @middleware checkAuth
 * @desc Middleware to authenticate requests using JWT
 * @access Protected (Requires a valid token)
 */
const checkAuth = (req, res, next) => {
    try {
        // Extract Authorization header
        const authHeader = req.headers?.authorization

        // Validate Authorization header format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(
                403,
                "Unauthorized",
                "Access token is missing or invalid."
            )
        }

        // Extract the JWT token from the header
        const token = authHeader.split(" ")[1]

        // Verify JWT token
        const user = jwt.verify(token, envConfig.JWT_SECRET)
        if (!user) {
            throw new AppError(403, "Unauthorized", "Invalid token.")
        }

        // Attach user data to the request object for further use
        req.user = user
        next() // Proceed to the next middleware/controller
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

        // Generic error handling
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
