const { Router } = require("express")
const authRouter = require("./auth.routes")

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

apiRouter.use("/auth", authRouter)

module.exports = apiRouter
