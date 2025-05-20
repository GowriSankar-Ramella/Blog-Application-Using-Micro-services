import jwt from "jsonwebtoken"

import {User} from "../models/User.model.js"

import ApiError from "../utils/ApiError.js"

import AsyncHandler from "../utils/AsyncHandler.js"

const isAuthenticated =AsyncHandler (async (req,res,next)=>{

    const accessToken = req.cookies?.accessToken

    if(!accessToken){
        throw new ApiError(401,"No accessToken found")
    }

    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password")

    if(!user){

        throw new ApiError(401,"Invalid access token")
    }

    req.user=user
    next()

})

export {isAuthenticated}