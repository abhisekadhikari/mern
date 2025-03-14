const { userProfile } = require("../controllers/user.controller")

const profileRouter = require("express").Router()

profileRouter.route("/profile").get(userProfile)

module.exports = profileRouter
