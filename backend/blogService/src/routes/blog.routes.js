import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getAllBlogs,getSingleBlog,addComment,getAllComments,deleteComment,saveBlog,getSavedBlog } from "../controllers/blog.controllers.js";

const router = express.Router();


router.get("/blog/all", getAllBlogs);
router.get("/blog/:id", getSingleBlog);
router.post("/comment/:id", isAuthenticated, addComment);
router.get("/comment/:id", getAllComments);
router.delete("/comment/:id", isAuthenticated, deleteComment);
router.post("/save/:id", isAuthenticated, saveBlog);
router.get("/blog/saved/all", isAuthenticated, getSavedBlog);

export default router;
