const {
    getUserProfile,
    createUserProfile,
} = require("../controllers/user.controller")
const profileValidationSchema = require("../validators/profile.validator")

const profileRouter = require("express").Router()

profileRouter.route("/profile").post(profileValidationSchema, createUserProfile)

profileRouter.route("/profile").get(getUserProfile)

module.exports = profileRouter
