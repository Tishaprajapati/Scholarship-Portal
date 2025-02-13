import express from "express";
import multer from "multer";
import {
  createApplication,
  getApplicationsByScholarship,
  getApplicationById,
  updateApplicationStatus,
  getAllApplicationsByUser,
} from "../controllers/application.controllers.js";
import auth from "../middlewares/auth.js"; // Assuming 'protect' middleware for authentication

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const documentFields = [
  { name: "aadharCard", maxCount: 1 },
  { name: "marksheet", maxCount: 1 },
  { name: "feeReceipt", maxCount: 1 },
  { name: "fathersIncomeCertificate", maxCount: 1 },
  { name: "rationCard", maxCount: 1 },
  { name: "fatherPanCard", maxCount: 1 },
  { name: "motherPanCard", maxCount: 1 },
];

router.post("/apply", auth, upload.fields(documentFields), createApplication); // Apply for scholarship
router.get("/scholarship/:scholarshipId", auth, getApplicationsByScholarship); // Get all applications for a specific scholarship
router.get("/:id", auth, getApplicationById); // Get all applications by a specific student
router.put("/:id/status", auth, updateApplicationStatus);
router.get("/", auth, getAllApplicationsByUser); // Get all applications by a specific student

export default router;
