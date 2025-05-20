import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config(); 



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localfilepath)=>{

try {
        if(!localfilepath){
            return null
        }
    
        const response = await cloudinary.uploader.upload(localfilepath,{resource_type: 'raw'})
    
        console.log("file uploaded to cludinary successfully : ",response)
    
        await fs.promises.unlink(localfilepath);

    
        return response
} catch (error) {

    await fs.promises.unlink(localfilepath);


    console.log("file uploading to cloudinary is failed ")

    return null
}
}

export {uploadOnCloudinary}