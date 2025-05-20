import AsyncHandler from "../utils/AsyncHandler.js";

import ApiError from "../utils/ApiError.js";

import ApiResponse from "../utils/ApiResponse.js"

import {User} from "../models/User.model.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js";


const getAccessToken = async(user_id)=>{
try {
        const user = await User.findById(user_id)
        console.log("user found : ",user)
        const accessToken = await user.generateAccessToken()
        return accessToken
} catch (error) {
    throw new ApiError(400,"something went wrong while generating accesstoken")
    
}
}

const register = AsyncHandler(async(req,res)=>{

    console.log("entered register block")

    const {email,name,password} = req.body
    
    console.log(email)


    if(
        [name , email , password].some((field)=> field.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(409,"User with given email is already registered")
    }

    if(!req.file){
        throw new ApiError(404,"File not found")
    }
    
    const response = await uploadOnCloudinary(req.file.path)

    if(!response){
        throw new ApiError(404,"Failed to upload on cloudinary")
    }


    const user = await User.create({
        name,
        email,
        password,
        image : response.url
    })

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500,"something went wrong during registration")
    }

    res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))

})

const login = AsyncHandler(async(req,res)=>{

    const {email,password} = req.body

    if(!email){
        throw new ApiError(400,"Email is required")
    }

    const user =await  User.findOne({email})

    if(!user){
        throw new ApiError(400,"User is not registered")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400,"Password is not correct")
    }

    const accessToken = await getAccessToken(user._id)

    const loggeduser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly : true,
        secure:true,
        maxAge:3 * 24 * 60 * 60 * 1000
    }

    res.status(200).cookie("accessToken",accessToken,options)
    .json(new ApiResponse(200,{user:loggeduser,accessToken},"user logged in successfully"))

})

const logout = AsyncHandler((req,res)=>{

    const options = {
        httpOnly : true,
        secure:true
    }

    res.status(201).clearCookie("accessToken",options).json(new ApiResponse(201,{},"User successfully logged out"))
})

const  myProfile = AsyncHandler(async(req,res)=>{

    const profile = await User.findById(req.user._id).select("-password")

    res.status(200).json(new ApiResponse(201,profile,"User profile fetched successfully"))
})

const getProfile = AsyncHandler(async(req,res)=>{

    const id = req.params.id

    const user = await User.findById(id)

    if(!user){
        throw new ApiError(404,"user not found")
    }

    res.status(200).json(new ApiResponse(201,user,"User profile fetched successfully"))
})

const updateUser = AsyncHandler(async(req,res)=>{

    const {name,instagram,facebook,linkedin,bio} = req.body

    const user = await User.findByIdAndUpdate(req.user._id,{
        name,
        facebook,
        instagram,
        linkedin,
        bio
    },{new:true})

    res.status(200).json(new ApiResponse(201,user,"user profile updated successfully"))
})

const updateProfilePicture = AsyncHandler(async(req,res)=>{

    const path = req.file.path

    if(!path){
        throw new ApiError(404,"File not found")
    }

    const response = await uploadOnCloudinary(path)

    if(!response){
        throw new ApiError(404,"Failed to upload on cloudinary")
    }

    const user = await User.findByIdAndUpdate(req.user._id,{
        image : response.url
    },{new:true})

    res.status(200).json(new ApiResponse(201,user,"Profile pic updated successfully"))
})

export {register,login,logout,myProfile,getProfile,updateUser,updateProfilePicture}