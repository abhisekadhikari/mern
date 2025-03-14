const { signupUser } = require("../controllers/user.controller")
const userValidator = require("../validators/user.validator")

const authRouter = require("express").Router()

authRouter.route("/signup").post(userValidator.signupValidator, signupUser)

module.exports = authRouter
