const mongoose = require("mongoose")

// Define the Profile Schema
const ProfileSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", // Reference to the User model
            required: true,
        },
        status: {
            type: String,
            required: true, // Example: "Software Developer"
        },
        skills: {
            type: [String], // Array of skills (e.g., ["JavaScript", "Node.js"])
            required: true,
        },
        bio: {
            type: String, // Optional short description about the user
        },
        experience: [
            {
                title: {
                    type: String,
                    required: true, // Job title (e.g., "Software Engineer")
                },
                company: {
                    type: String,
                    required: true, // Company name
                },
                from: {
                    type: Date,
                    required: true, // Start date of employment
                },
                to: {
                    type: Date, // End date (optional if current)
                },
                current: {
                    type: Boolean,
                    default: false, // Whether currently working in this role
                },
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true, // University/College name
                },
                degree: {
                    type: String,
                    required: true, // Degree title (e.g., "Bachelor of Technology")
                },
                fieldofstudy: {
                    type: String,
                    required: true, // Field of study (e.g., "Computer Science")
                },
                from: {
                    type: Date,
                    required: true, // Start date of education
                },
                to: {
                    type: Date, // End date (optional if still studying)
                },
                current: {
                    type: Boolean,
                    default: false, // Whether currently enrolled
                },
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt & updatedAt fields
    }
)

// Create the Profile model
const Profile = mongoose.model("profile", ProfileSchema)

module.exports = Profile
