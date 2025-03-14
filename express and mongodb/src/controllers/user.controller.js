const { validationResult, matchedData } = require("express-validator")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const AppError = require("../utils/AppError")
const User = require("../models/user.model")

const signupUser = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(400, "please solve all the errors", error.mapped())

    const data = matchedData(req)

    const newUser = await User.create(data)

    res.status(201).json({
        success: true,
        message: "new user registered",
        data: newUser,
    })
})

module.exports = {
    signupUser,
}
