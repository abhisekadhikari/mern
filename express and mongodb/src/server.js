const app = require("./app")
const connectDB = require("./config/db")

connectDB()
    .then(() => {
        app.listen(process.env.PORT ?? 3000, () => {
            console.log(`Server started 🚀🚀`)
            console.log(
                `Listening On: http://localhost:${process.env.PORT ?? 3000}`
            )
        })
    })
    .catch((err) => {
        console.error(`Server Not Started: ${err.message}`)
        process.exit(1)
    })
