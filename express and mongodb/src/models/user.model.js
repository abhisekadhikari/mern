const mongoose = require("mongoose")
const AppError = require("../utils/AppError")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            index: true,
        },

        password: {
            type: String,
            required: [true, "password is required"],
        },

        avatar: {
            type: String,
            default: "https://www.gravatar.com/avatar/?d=identicon",
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        throw new AppError(
            400,
            "error while saving the user",
            "error while hashing the password"
        )
    }
})

userSchema.methods.comparePassword = async function () {
    const isValid = await bcrypt.compare(password, this.password)

    return isValid
}

const User = mongoose.model("user", userSchema)

module.exports = User
