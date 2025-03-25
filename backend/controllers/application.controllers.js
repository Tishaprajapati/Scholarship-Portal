import { Application } from "../models/application.model.js";
import { Scholarship } from "../models/scholarship.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// ✅ CREATE APPLICATION FUNCTION - Prevent duplicate applications
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

    // ✅ Check if the student is already approved for another scholarship
    const approvedScholarship = await Application.findOne({
      user: userId,
      status: "approved",
    });

    if (approvedScholarship) {
      return res.status(403).json({
        message:
          "You have already been approved for a scholarship. You cannot apply for another.",
        success: false,
      });
    }

    // ✅ Check if the scholarship exists
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found.",
        success: false,
      });
    }

    // ✅ Upload documents to Cloudinary
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

    // ✅ Create the application with user reference
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

// ✅ GET ALL APPLICATIONS FOR A SPECIFIC SCHOLARSHIP
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

// ✅ GET A SINGLE APPLICATION BY APPLICATION ID
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

// ✅ GET ALL APPLICATIONS FOR A SPECIFIC USER (getAllApplicationsByUser)
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

// ✅ UPDATE APPLICATION STATUS FUNCTION - Auto reject other applications
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

    // Find the current application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // Check if user has any other approved applications
    const existingApprovedApplication = await Application.findOne({
      user: application.user,
      _id: { $ne: applicationId }, // exclude current application
      status: "approved",
    });

    if (existingApprovedApplication) {
      return res.status(400).json({
        message:
          "Cannot update status. User already has an approved scholarship.",
        success: false,
      });
    }

    // Proceed with status update
    application.status = status;
    await application.save();

    // If application is approved, reject all other pending applications of the student
    if (status === "approved") {
      await Application.updateMany(
        {
          user: application.user,
          _id: { $ne: application._id },
          status: "pending",
        },
        { $set: { status: "rejected" } }
      );
    }

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

export const checkApprovedStatus = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.id;

    // Check if user has any approved applications
    const approvedApplication = await Application.findOne({
      user: userId,
      status: "approved",
    }).populate("scholarship", "title organizationName");

    if (approvedApplication) {
      return res.status(200).json({
        success: true,
        hasApprovedScholarship: true,
        message: "You have already been approved for a scholarship",
        scholarshipDetails: {
          applicationId: approvedApplication._id,
          scholarshipTitle: approvedApplication.scholarship.title,
          organizationName: approvedApplication.scholarship.organizationName,
        },
      });
    }

    return res.status(200).json({
      success: true,
      hasApprovedScholarship: false,
      message: "No approved scholarships found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error checking scholarship approval status",
      error: error.message,
    });
  }
};
