const { validationResult, matchedData } = require("express-validator")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const AppError = require("../utils/AppError")
const User = require("../models/user.model")
const Profile = require("../models/profile.model")
const mongoose = require("mongoose")

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
const signupUser = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    console.log(data)

    // Check if the user already exists
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
        throw new AppError(400, "Registration failed", {
            email: "This email is already in use",
        })
    }

    const newUser = await User.create(data)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
    })
})

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
const loginUser = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    const isValidUser = await User.findOne({
        email: data.email,
    })

    if (!isValidUser)
        throw new AppError(
            400,
            "Authentication failed",
            "Incorrect email or password. Please try again."
        )

    const checkPassword = await isValidUser.comparePassword(data.password)

    if (!checkPassword)
        throw new AppError(
            400,
            "Authentication failed",
            "Incorrect email or password. Please try again."
        )

    const jwtSignedToken = isValidUser.signJwtToken()

    res.status(200).json({
        success: true,
        message: "Login successful",
        token: jwtSignedToken,
    })
})

/**
 * @route   POST /api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
const createUserProfile = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    const isUserAlreadyCreated = await Profile.findOne({
        user_id: new mongoose.Types.ObjectId(req.user._id),
    })

    if (isUserAlreadyCreated) {
        throw new AppError(
            400,
            "invalid request",
            "user profile already exists."
        )
    }

    const userProfile = await Profile.create({
        user_id: req.user._id,
        ...data,
    })

    res.status(201).json({
        success: true,
        message: "User profile created",
        data: userProfile,
    })
})

/**
 * @route   GET /api/profile
 * @desc    Get logged in user profile along with user details
 * @access  Private
 */

const getUserProfile = asyncErrorHandler(async (req, res) => {
    try {
        // Check if a valid user_id is provided; otherwise, use the logged-in user's ID
        const user_id = mongoose.isValidObjectId(req.query.user_id)
            ? new mongoose.Types.ObjectId(req.query.user_id)
            : new mongoose.Types.ObjectId(req.user._id)

        const userProfile = await Profile.aggregate([
            {
                $match: { user_id },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user", // If you expect a single user, otherwise remove this
            },
        ])

        return res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: userProfile,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the user profile",
        })
    }
})

/**
 * @route   GET /api/profile
 * @desc    Get user profile along with user details
 * @access  Private
 */
const getUsersProfile = asyncErrorHandler(async (req, res) => {
    const usersProfile = await User.aggregate([
        [
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "profile",
                },
            },
            {
                $unwind: {
                    path: "$profile",
                },
            },
            {
                $project: {
                    name: 1,
                    "profile.status": 1,
                    "profile.skills": 1,
                    "profile.bio": 1,
                },
            },
        ],
    ])

    return res.status(200).json({
        success: true,
        message: "Users profile retrieved successfully",
        data: usersProfile,
    })
})

/**
 * @route   PUT /api/profile
 * @desc    Get user profile along with user details
 * @access  Private
 */

const updateUserProfile = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    const updatedProfile = await Profile.findOneAndUpdate(
        {
            user_id: new mongoose.Types.ObjectId(req.user._id),
        },
        {
            ...data,
        }
    )

    res.status(200).json({
        message: "user profile updated successfully",
        success: true,
        data: updatedProfile,
    })
})

/**
 * @route   PATCH /api/profile/experience
 * @desc    Add new experience to user profile
 * @access  Private
 */
const updateUserExperience = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    const profile = await Profile.findOne({ user_id: req.user._id })

    profile.experience.unshift(data)

    const newExp = await profile.save()

    res.status(200).json({
        success: true,
        message: "User experience updated successfully",
        data: newExp,
    })
})

/**
 * @route   DELETE /api/profile/experience/:exp_id
 * @desc    Remove an experience entry from user profile
 * @access  Private
 */
const removeUserExperience = asyncErrorHandler(async (req, res) => {
    const { exp_id } = req.params // Get experience ID from request params

    // Find profile by user ID
    const profile = await Profile.findOne({ user_id: req.user._id })

    if (!profile) {
        throw new AppError(404, "Profile not found.")
    }

    // Filter out the experience with the given exp_id
    profile.experience = profile.experience.filter(
        (exp) => exp._id.toString() !== exp_id
    )

    // Save the updated profile
    await profile.save()

    res.json({
        success: true,
        message: "Experience removed successfully.",
        data: profile,
    })
})

/**
 * @route   DELETE /api/profile/experience/:exp_id
 * @desc    Remove an experience entry from user profile
 * @access  Private
 */
const removeUserEducation = asyncErrorHandler(async (req, res) => {
    const { edu_id } = req.params // Get experience ID from request params

    // Find profile by user ID
    const profile = await Profile.findOne({ user_id: req.user._id })

    if (!profile) {
        throw new AppError(404, "Profile not found.")
    }

    // Filter out the experience with the given edu_id
    profile.education = profile.education.filter(
        (edu) => edu._id.toString() !== edu_id
    )

    // Save the updated profile
    await profile.save()

    res.json({
        success: true,
        message: "Education removed successfully.",
        data: profile,
    })
})

module.exports = {
    signupUser,
    loginUser,
    getUserProfile,
    createUserProfile,
    getUsersProfile,
    updateUserProfile,
    updateUserExperience,
    removeUserExperience,
    removeUserEducation,
}
