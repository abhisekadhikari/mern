const app = require("./app")
const connectDB = require("./config/db")
const envConfig = require("./config/env.config")

connectDB()
    .then(() => {
        app.listen(envConfig.PORT ?? 3000, () => {
            console.log(`Server started 🚀🚀`)
            console.log(
                `Listening On: http://localhost:${envConfig.PORT ?? 3000}`
            )
        })
    })
    .catch((err) => {
        console.error(`Server Not Started: ${err.message}`)
        process.exit(1)
    })
