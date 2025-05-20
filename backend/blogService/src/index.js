import dotenv from "dotenv"
import app from './app.js'
import connectdb from './config/db.js'
import {createClient} from 'redis'
import { startCacheConsumer } from "./utils/consumer.js"

dotenv.config({path : './.env'})

startCacheConsumer()

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 4002 , ()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("mongodb connection failed")
})

export const redisClient = createClient({
    url:process.env.REDIS_URI
})

redisClient.connect()
.then(()=>{
    console.log("Connected to redis successfully")
})
.catch((err)=>{
    console.log("Failed to connect with redis :",err)
})