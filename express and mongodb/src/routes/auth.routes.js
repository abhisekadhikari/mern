const { signupUser } = require("../controllers/user.controller")
const userValidator = require("../validators/user.validator")

const authRouter = require("express").Router()

/**
 * @route POST /api/auth/signup
 * @desc new user registration
 * @access Public
 */
authRouter.route("/signup").post(userValidator.signupValidator, signupUser)

module.exports = authRouter
