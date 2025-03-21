const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const envConfig = require("../config/env.config")

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // Ensures no duplicate emails
            index: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        avatar: {
            type: String,
            default: "https://www.gravatar.com/avatar/?d=identicon", // Default profile picture
        },
    },
    {
        timestamps: true, // Automatically adds createdAt & updatedAt fields
    }
)

// Hash password before saving the user document
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next() // Hash only if the password field is modified
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        throw new AppError(
            400,
            "Error while saving the user",
            "Error while hashing the password"
        )
    }
})

// Method to compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Method to generate JWT token for authentication
userSchema.methods.signJwtToken = function () {
    return jwt.sign(
        {
            email: this.email,
            _id: this._id,
        },
        envConfig.JWT_SECRET,
        {
            issuer: "Udemy", // Token issuer
            expiresIn: "30d", // Token expiration time
        }
    )
}

// Create User model from schema
const User = mongoose.model("user", userSchema)

module.exports = User
