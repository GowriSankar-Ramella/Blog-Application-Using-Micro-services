import AsyncHandler from "../utils/AsyncHandler.js"
import {Blog} from "../models/blog.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../../../authorService/src/utils/ApiError.js";
import { Comment } from "../models/comments.model.js";
import { Saved } from "../models/savedBlogs.model.js";
import { redisClient } from "../index.js";

const getAllBlogs = AsyncHandler(async(req,res)=>{

    const { search = "", category = "" } = req.query;

    const cacheKey = `blogs:${search}:${category}`;

    const cached = await redisClient.get(cacheKey)

    if(cached){

      console.log("serving from redis cache")

      res.status(200).json(new ApiResponse(201,JSON.parse(cached),"Blogs fetched Successfully"))
      return
    }
    const filter = {};

    // If search is provided, match title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // If category is provided, add it to filter
    if (category) {
      filter.category = category;
    }

    // Fetch blogs based on filter
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    console.log("serving from db")

    await redisClient.set(cacheKey,JSON.stringify(blogs),{EX : 3600})

    res.status(200).json(new ApiResponse(201,blogs,"Blogs fetched Successfully"))

})

const getSingleBlog = AsyncHandler(async(req,res)=>{

  const blogid = req.params.id

  const blog = await Blog.findById(blogid)

  if(!blog){
    throw new ApiError(404,"Blog not found")
  }

  const cacheKey = `blogs:${blogid}`

  const cached = await redisClient.get(cacheKey)

  if(cached){

    console.log("serving from redis cache")

    res.status(200).json(new ApiResponse(201,JSON.parse(cached),"Blog fetched successfully"))

    return
  }

  console.log("serving from db")

  await redisClient.set(cacheKey,JSON.stringify(blog),{EX : 3600})
  
  res.status(200).json(new ApiResponse(201,blog,"Blog fetched successfully"))
})

const addComment = AsyncHandler(async(req,res)=>{

  const id = req.params.id
  
  const {comment} = req.body

  if(!comment){
    throw new ApiError(404,"comment cannot be empty")
  }

  const addcomment = await Comment.create({
    comment,
    userid : req.user._id,
    username : req.user.name,
    blogid : id
  })

  res.status(200).json(new ApiResponse(201,addcomment,"Comment added successfully"))
})

const getAllComments = AsyncHandler(async(req,res)=>{

  console.log("Entered  into comments")

  const {id:blogid} = req.params

  console.log(blogid)

  const allComments = await Comment.find({blogid}).sort({ createdAt: -1 })

  res.status(200).json(new ApiResponse(201,allComments,"All comments fetched successfully"))
})

const deleteComment = AsyncHandler(async(req,res)=>{

  const id = req.params.id

  const comment = await Comment.findById(id)

  if(!comment){
    throw new ApiError(404,"Comment not found")
  }

  await comment.deleteOne()

  res.status(200).json(new ApiResponse(201,{},"Comment deleted successfully"))
})

const saveBlog = AsyncHandler(async(req,res)=>{

  const blogid = req.params.id

  const blog = await Saved.find({
    userid : req.user._id ,
    blogid
  })

  console.log(blog)

  if(blog.length===0){

    const savedBlog = await Saved.create({
    userid : req.user._id ,
    blogid
    })

    res.status(200).json(new ApiResponse(201,savedBlog,"Blog saved Successfully"))
  }

  await blog[0].deleteOne()

  res.status(200).json(new ApiResponse(201,{},"Blog unsaved successfully"))

})

const getSavedBlog = AsyncHandler(async(req,res)=>{

  const savedBlogs = await Saved.find({userid : req.user._id}).sort({ createdAt: -1 })

  res.status(200).json(new ApiResponse(201,savedBlogs,"Saved blogs fetched successfully"))
})

export {getAllBlogs,getSingleBlog,addComment,getAllComments,deleteComment,saveBlog,getSavedBlog}