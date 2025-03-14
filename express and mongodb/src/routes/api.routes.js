const { Router } = require("express")
const authRouter = require("./auth.routes")
const profileRouter = require("./profile.routes")
const checkAuth = require("../middlewares/checkAuth.middleware")

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

/**
 * @route /auth
 * @desc user authentication route
 */
apiRouter.use("/auth", authRouter)

apiRouter.use("/user", checkAuth, profileRouter)

module.exports = apiRouter
