const { validationResult, matchedData } = require("express-validator")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const AppError = require("../utils/AppError")
const User = require("../models/user.model")
const Profile = require("../models/profile.model")

const signupUser = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

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
        message: "login successful",
        token: jwtSignedToken,
    })
})

const createUserProfile = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    const userProfile = await Profile.create({
        user_id: req.user._id,
        ...data,
    })

    res.status(201).json({
        success: true,
        message: "user profile created",
        data: userProfile,
    })
})

const getUserProfile = asyncErrorHandler(async (req, res) => {
    const userProfile = await Profile.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
            },
        },
    ])

    return res.status(200).json({
        success: true,
        message: "user profile",
        data: userProfile,
    })
})

module.exports = {
    signupUser,
    loginUser,
    getUserProfile,
    createUserProfile,
}
