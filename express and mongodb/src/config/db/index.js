const mongoose = require("mongoose")
const envConfig = require("../env.config")

// Function to establish a database connection
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment configuration
        const connectionInstance = await mongoose.connect(envConfig.MONGO_URI)

        console.log("Database Connected 🚀")
        console.log(`Database Name: ${connectionInstance.connection.name}`)
        console.log(`Database Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`)
        process.exit(1) // Exit process if database connection fails
    }
}

module.exports = connectDB
