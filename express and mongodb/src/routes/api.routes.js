const { Router } = require("express")

const apiRouter = Router()

/**
 * @route GET /api
 * @desc Welcome message
 * @access Public
 */
apiRouter.route("/").get((req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the app!",
    })
})

module.exports = apiRouter
