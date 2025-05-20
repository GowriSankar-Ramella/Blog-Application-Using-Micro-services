import dotenv from "dotenv"
import app from './app.js'
import connectdb from './config/db.js'
import { connectRabbitMQ } from "./utils/rabbitmq.js"

dotenv.config({path : './.env'})

connectRabbitMQ()
connectdb()
.then(()=>{
    app.listen(process.env.PORT || 4001 , ()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("mongodb connection failed")
})