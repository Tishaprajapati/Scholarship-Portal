import express from "express";
import { register, login, updateProfile, logout } from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js"; 
const router = express.Router();

router.post("/register", register); // Register user
router.post("/login", login); // User login
router.put("/update/profile", auth, updateProfile); // Update profile
router.get("/logout", logout); // Logout

export default router;
