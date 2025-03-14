const { checkSchema } = require("express-validator")

const userValidator = {
    signupValidator: checkSchema({
        name: {
            isString: true,
            isLength: {
                options: { min: 4 },
                errorMessage: "name should be at least 8 chars",
            },
        },

        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "please enter a valid email address.",
        },

        password: {
            isString: true,
            isLength: {
                options: {
                    min: 8,
                },
                errorMessage: "password should be atleast 8 characters long",
            },
        },

        avatar: {
            isString: true,
            optional: true,
        },
    }),
}

module.exports = userValidator
