import { Application } from "../models/application.model.js";
import { Scholarship } from "../models/scholarship.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const studentName = req.body.studentName;
    const studentType = req.body.studentType;
    const schoolOrCollegeName = req.body.schoolOrCollegeName;
    const yearOrStandard = req.body.yearOrStandard;
    const studentCaste = req.body.studentCaste;
    const fatherDetails = JSON.parse(req.body.fatherDetails);
    const motherDetails = JSON.parse(req.body.motherDetails);
    const scholarshipId = req.body.scholarshipId;
    const userId = req.id; // Get user ID from authenticated request

    if (
      !studentName ||
      !studentType ||
      !schoolOrCollegeName ||
      !studentCaste ||
      !yearOrStandard ||
      !fatherDetails ||
      !motherDetails ||
      !scholarshipId ||
      !req.files
    ) {
      return res.status(400).json({
        message: "All fields and documents are required",
        success: false,
      });
    }

    // Check if the scholarship exists
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found.",
        success: false,
      });
    }

    // Upload documents to Cloudinary
    const documents = {};
    const requiredDocs = [
      "aadharCard",
      "marksheet",
      "feeReceipt",
      "fathersIncomeCertificate",
      "rationCard",
      "fatherPanCard",
      "motherPanCard",
    ];

    for (const doc of requiredDocs) {
      if (!req.files[doc]) {
        return res.status(400).json({
          message: `${doc} document is required`,
          success: false,
        });
      }

      const fileUri = getDataUri(req.files[doc][0]);
      const result = await cloudinary.uploader.upload(fileUri.content, {
        folder: "scholarship_documents",
      });

      documents[doc] = result.secure_url;
    }

    // Create the application with user reference
    const application = await Application.create({
      user: userId,
      studentName,
      studentType,
      schoolOrCollegeName,
      yearOrStandard,
      studentCaste,
      fatherDetails,
      motherDetails,
      documents,
      scholarship: scholarshipId,
    });

    return res.status(201).json({
      message: "Application submitted successfully.",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// Get all applications for a specific scholarship
export const getApplicationsByScholarship = async (req, res) => {
  try {
    const scholarshipId = req.params.scholarshipId;

    // Fetch the applications
    const applications = await Application.find({ scholarship: scholarshipId });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found for this scholarship.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// Get application details by application ID
export const getApplicationById = async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Fetch the application details
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};
export const getAllApplicationsByUser = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ user: userId }).populate(
      "scholarship"
    );

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found for this user.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// Update the application status (admin only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value.",
        success: false,
      });
    }

    // Find and update the application status
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      message: `Application status updated to ${status}.`,
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};
