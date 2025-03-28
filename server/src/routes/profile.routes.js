const {
    getUserProfile,
    createUserProfile,
    updateUserExperience,
    removeUserExperience,
    getUsersProfile,
    updateUserProfile,
    removeUserEducation,
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
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
profileRouter
    .route("/profile")
    .put(profileValidationSchema.profileValidator, updateUserProfile)

/**
 * @route   GET /api/profile
 * @desc    Get user profile with id
 * @access  Private
 */
profileRouter.route("/profile/all").get(getUsersProfile)

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

/**
 * @route   DELETE /api/profile/education/:exp_id
 * @desc    Remove an education entry from profile
 * @access  Private
 */
profileRouter.route("/profile/education/:edu_id").delete(removeUserEducation)

module.exports = profileRouter
