const {
    getUserProfile,
    createUserProfile,
    updateUserExperience,
} = require("../controllers/user.controller")
const profileValidationSchema = require("../validators/profile.validator")

const profileRouter = require("express").Router()

profileRouter
    .route("/profile")
    .post(profileValidationSchema.profileValidator, createUserProfile)

profileRouter.route("/profile").get(getUserProfile)

profileRouter
    .route("/profile/experience")
    .patch(profileValidationSchema.experienceValidator, updateUserExperience)

module.exports = profileRouter
