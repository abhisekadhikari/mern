const { checkSchema } = require("express-validator")

const profileValidationSchema = {
    profileValidator: checkSchema({
        status: {
            errorMessage: "Status is required",

            isString: {
                errorMessage: "Status must be a string",
            },
        },
        skills: {
            errorMessage: "Skills are required",

            isArray: {
                errorMessage: "Skills must be an array of strings",
            },
            custom: {
                options: (skills) =>
                    skills.every((skill) => typeof skill === "string"),
                errorMessage: "Each skill must be a string",
            },
        },
        bio: {
            optional: true,
            isString: {
                errorMessage: "Bio must be a string",
            },
        },
        "experience.*.title": {
            errorMessage: "Title is required",

            isString: {
                errorMessage: "Title must be a string",
            },
        },
        "experience.*.company": {
            errorMessage: "Company is required",

            isString: {
                errorMessage: "Company must be a string",
            },
        },
        "experience.*.from": {
            errorMessage: "Start date is required",

            isISO8601: {
                errorMessage: "Start date must be a valid date",
            },
        },
        "experience.*.to": {
            optional: true,
            isISO8601: {
                errorMessage: "End date must be a valid date",
            },
        },
        "experience.*.current": {
            optional: true,
            isBoolean: {
                errorMessage: "Current must be a boolean",
            },
        },
        "education.*.school": {
            errorMessage: "School is required",

            isString: {
                errorMessage: "School must be a string",
            },
        },
        "education.*.degree": {
            errorMessage: "Degree is required",

            isString: {
                errorMessage: "Degree must be a string",
            },
        },
        "education.*.fieldofstudy": {
            errorMessage: "Field of study is required",

            isString: {
                errorMessage: "Field of study must be a string",
            },
        },
        "education.*.from": {
            errorMessage: "Start date is required",

            isISO8601: {
                errorMessage: "Start date must be a valid date",
            },
        },
        "education.*.to": {
            optional: true,
            isISO8601: {
                errorMessage: "End date must be a valid date",
            },
        },
        "education.*.current": {
            optional: true,
            isBoolean: {
                errorMessage: "Current must be a boolean",
            },
        },
    }),

    experienceValidator: checkSchema({
        title: {
            errorMessage: "Title is required",

            isString: {
                errorMessage: "Title must be a string",
            },
        },
        company: {
            errorMessage: "Company is required",

            isString: {
                errorMessage: "Company must be a string",
            },
        },
        from: {
            errorMessage: "Start date is required",

            isISO8601: {
                errorMessage: "Start date must be a valid date",
            },
        },
        to: {
            optional: true,
            isISO8601: {
                errorMessage: "End date must be a valid date",
            },
        },
        current: {
            optional: true,
            isBoolean: {
                errorMessage: "Current must be a boolean",
            },
        },
    }),
}

module.exports = profileValidationSchema
