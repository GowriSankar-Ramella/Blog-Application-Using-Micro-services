import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createBlog,updateBlog,deleteBlog } from "../controllers/author.controllers.js";


const router = express.Router();


router.post("/new", isAuthenticated, upload.single("file"), createBlog);
router.post("/update/:id", isAuthenticated, upload.single("file"), updateBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);

export default router;
