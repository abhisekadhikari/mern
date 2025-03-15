const { Router } = require("express")
const authRouter = require("./auth.routes")
const profileRouter = require("./profile.routes")
const checkAuth = require("../middlewares/checkAuth.middleware")
const postRouter = require("./post.routes")

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
 * @route /api/auth
 * @desc User authentication routes (Signup, Login)
 * @access Public
 */
apiRouter.use("/auth", authRouter)

/**
 * @route /api/user
 * @desc User profile-related routes (CRUD profile, experience, education)
 * @access Private (Requires authentication)
 */
apiRouter.use("/user", checkAuth, profileRouter)

/**
 * @route /api/post
 * @desc Post-related routes (Create, Read, Update, Delete, Like, Comment)
 * @access Private (Requires authentication)
 */
apiRouter.use("/post", checkAuth, postRouter)

module.exports = apiRouter
