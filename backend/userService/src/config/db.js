import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectdb = async ()=>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongodb connection successful db host : ${connectioninstance.connection.host}`);
        
    } catch (error) {
        console.log("Mongodb connection failed ",error);
        process.exit(1)
        
    }
}

export default connectdb