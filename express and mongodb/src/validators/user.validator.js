const { checkSchema } = require("express-validator")

const userValidator = {
    signupValidator: checkSchema({
        name: {
            isString: true,
            trim: true,
            errorMessage: "Name is required.",
            isLength: {
                options: { min: 4 },
                errorMessage: "Name must be at least 4 characters long.",
            },
        },

        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email is required.",
            errorMessage: "Enter a valid email address.",
        },

        password: {
            isString: true,
            errorMessage: "Password is required.",
            isLength: {
                options: { min: 8 },
                errorMessage: "Password must be at least 8 characters long.",
            },
        },

        avatar: {
            isString: true,
            optional: true,
            errorMessage: "Avatar must be a valid URL or string.",
        },
    }),

    loginValidator: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "please enter a valid email address.",
        },

        password: {
            isString: true,
            errorMessage: "Password is required.",
            isLength: {
                options: { min: 8 },
                errorMessage: "Password must be at least 8 characters long.",
            },
        },
    }),
}

module.exports = userValidator
