const path = require("path")

// Load environment variables from the appropriate .env file
require("dotenv").config({
    debug: true,
    path:
        process.env.NODE_ENV === "dev"
            ? path.resolve(".env.dev")
            : path.resolve(".env"),
})

// Get the current environment mode
const NODE_ENV = process.env.NODE_ENV

// Development environment configuration
const devEnv = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}

// Production environment configuration
const prodEnv = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}

// Determine which configuration to use based on the environment
const envConfig = NODE_ENV === "dev" ? devEnv : prodEnv

// Freeze the configuration object to prevent modifications
Object.freeze(envConfig)

module.exports = envConfig
