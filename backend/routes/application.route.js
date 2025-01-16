import express from "express";
import { createApplication, getApplicationsByScholarship, getApplicationById, updateApplicationStatus} from "../controllers/application.controllers.js";
import auth from "../middlewares/auth.js"; // Assuming 'protect' middleware for authentication

const router = express.Router();

router.post("/apply", auth, createApplication); // Apply for scholarship
router.get("/scholarship/:id", auth, getApplicationsByScholarship); // Get all applications for a specific scholarship
router.get("/student/:id", auth, getApplicationById); // Get all applications by a specific student
router.get("/student/:id", auth, updateApplicationStatus);
export default router;
