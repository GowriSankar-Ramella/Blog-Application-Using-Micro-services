import ApiResponse from "../../../userService/src/utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




const createBlog = AsyncHandler(async (req, res) => {

    const { title, description, blogContent, category } = req.body;

    const file = req.file

    if (!file) {
        throw new ApiError(404, "File not found")
    }

    const response = await uploadOnCloudinary(req.file.path)

    if (!response) {
        throw new ApiError(400, "File not uploaded on cloudinary")
    }

    const blog = await Blog.create({
        title,
        description,
        blogContent,
        category,
        image: response.url,
        author: req.user._id
    })

    res.status(200).json(new ApiResponse(201, blog, "Blog created successfully"))
})

const updateBlog = AsyncHandler(async (req, res) => {

    const { id } = req.params;

    const { title, description, blogContent, category } = req.body;

    const file = req.file;

    const Blog = await Blog.findById(id)

    if (!Blog.author.equals(req.user._id)) {
        throw new ApiError(403, "Unauthorized access");
    }


    if (!file) {
        throw new ApiError(400, "File not found")
    }

    if (
        [title, description, blogContent, category].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const response = await uploadOnCloudinary(req.file.path)

    if (!response) {
        throw new ApiError(400, "File not uploaded on cloudinary")
    }

    const blog = await Blog.findByIdAndUpdate(id, {
        title,
        description,
        blogContent,
        category,
        image: response.url
    }, { new: true })

    console.log(blog)

    res.status(200).json(new ApiResponse(201, blog, "Blog updated successfully"))
})

const deleteBlog = AsyncHandler(async (req, res) => {

    const id = req.params.id

    const blog = await Blog.findById(id)

    if (!blog) {
        throw new ApiError(400, "Blog not found")
    }

    if (!blog.author.equals(req.user._id)) {
        throw new ApiError(403, "Unauthorized access");
    }

    await blog.deleteOne()

    res.status(200).json(new ApiResponse(201, {}, "Blog deleted successfully"))
})

export { createBlog, updateBlog, deleteBlog }