class AppError extends Error {
    constructor(statusCode, message, error) {
        super(message)
        this.error = error
        this.statusCode = statusCode
    }
}

module.exports = AppError
