const {
    getUserProfile,
    createUserProfile,
    updateUserExperience,
    removeUserExperience,
} = require("../controllers/user.controller")
const profileValidationSchema = require("../validators/profile.validator")

const profileRouter = require("express").Router()

/**
 * @route   POST /api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
profileRouter
    .route("/profile")
    .post(profileValidationSchema.profileValidator, createUserProfile)

/**
 * @route   GET /api/profile
 * @desc    Get user profile
 * @access  Private
 */
profileRouter.route("/profile").get(getUserProfile)

/**
 * @route   PATCH /api/profile/experience
 * @desc    Add or update user experience
 * @access  Private
 */
profileRouter
    .route("/profile/experience")
    .patch(profileValidationSchema.experienceValidator, updateUserExperience)

/**
 * @route   DELETE /api/profile/experience/:exp_id
 * @desc    Remove an experience entry from profile
 * @access  Private
 */
profileRouter.route("/profile/experience/:exp_id").delete(removeUserExperience)

module.exports = profileRouter
