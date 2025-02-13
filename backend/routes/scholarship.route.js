import express from "express";
import {
  checkEligibility,
  createScholarship,
  getAllScholarships,
  getScholarshipById,
} from "../controllers/scholarship.controllers.js";
import auth from "../middlewares/auth.js"; // Assuming 'protect' and 'isAdmin' middleware

const router = express.Router();

router.post("/createScholarship", auth, createScholarship); // Create scholarship (admin only)
router.get("/get", auth, getAllScholarships); // Get all scholarships
router.get("/:id", getScholarshipById); // Get scholarship by ID
router.get("/checkEligibility/:id", checkEligibility);
export default router;
