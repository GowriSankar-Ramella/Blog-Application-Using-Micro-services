import express from "express"
import errorHandler from "./middleware/errorHandler.js"
import cors from "cors"
import cookieparser from "cookie-parser"
import blogRoutes from "./routes/blog.routes.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors( {
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({ limit: "16kb" }))

app.use(express.urlencoded({extended : true , limit : "16kb"}))


app.use(cookieparser())

app.use("/api",blogRoutes)

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" })
  })
  

app.use(errorHandler)

export default app