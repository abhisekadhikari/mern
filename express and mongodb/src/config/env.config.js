const path = require("path")

require("dotenv").config({
    debug: true,
    path:
        process.env.NODE_ENV === "dev"
            ? path.resolve(".env.dev")
            : path.resolve(".env"),
})

const NODE_ENV = process.env.NODE_ENV

const devEnv = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}

const prodEnv = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}

const envConfig = NODE_ENV === "dev" ? devEnv : prodEnv

Object.freeze(envConfig) // Prevents the modification of existing property attributes and values, and prevents the addition of new properties

module.exports = envConfig
