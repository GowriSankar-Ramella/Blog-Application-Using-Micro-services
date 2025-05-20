import dotenv from "dotenv"
import app from './app.js'
import connectdb from './config/db.js'
import {createClient} from 'redis'

dotenv.config({path : './.env'})

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