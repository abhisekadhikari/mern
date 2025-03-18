const { checkSchema } = require("express-validator")

const postValidatorSchema = {
    postValidator: checkSchema({
        text: {
            isString: true,
            isLength: {
                options: { min: 1 },
                errorMessage: "Text cannot be empty",
            },
        },

        /* likes: {
            optional: true,
            isArray: true,
            errorMessage: "Likes must be an array",
        },
        "likes.*.user": {
            optional: true,
            isMongoId: true,
            errorMessage: "Invalid user ID in likes",
        },
        comments: {
            optional: true,
            isArray: true,
            errorMessage: "Comments must be an array",
        },
        "comments.*.user": {
            optional: true,
            isMongoId: true,
            errorMessage: "Invalid user ID in comments",
        },
        "comments.*.text": {
            isString: true,
            isLength: {
                options: { min: 1 },
                errorMessage: "Comment text cannot be empty",
            },
        },
        "comments.*.name": {
            optional: true,
            isString: true,
            errorMessage: "Comment name must be a string",
        },
        "comments.*.avatar": {
            optional: true,
            isString: true,
            errorMessage: "Comment avatar must be a string",
        }, */
    }),
}

module.exports = postValidatorSchema
