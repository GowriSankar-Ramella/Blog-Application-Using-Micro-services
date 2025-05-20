import express from "express";
import { register, login, logout } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { myProfile,getProfile,updateUser,updateProfilePicture} from "../controllers/user.controller.js";

const router = express.Router();

// Public routes
router.post("/register",upload.single("file"),register);
router.post("/login", login);
router.get("/logout",isAuthenticated,logout)
router.get("/me", isAuthenticated, myProfile);
router.post("/update", isAuthenticated, updateUser);
router.post("/update/pic", isAuthenticated, upload.single("file"), updateProfilePicture);
router.get("/:id", getProfile);

export default router;
