import dotenv from "dotenv"
import app from './app.js'
import connectdb from './config/db.js'

dotenv.config({path : './.env'})

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 4000 , ()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("mongodb connection failed")
})