// Import application and configuration modules
const app = require("./app")
const connectDB = require("./config/db")
const envConfig = require("./config/env.config")

// Connect to the database and start the server
connectDB()
    .then(() => {
        const PORT = envConfig.PORT ?? 3000 // Set default port if not defined

        app.listen(PORT, () => {
            console.log("Server started 🚀🚀")
            console.log(`Listening on: http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error(`Server Not Started: ${err.message}`)
        process.exit(1) // Exit process on database connection failure
    })
