import { Application } from "../models/application.model.js";
import { Scholarship } from "../models/scholarship.model.js";

// Create a new application
export const createApplication = async (req, res) => {
    try {
        const {
            studentName,
            studentType,
            schoolOrCollegeName,
            yearOrStandard,
            fatherDetails,
            motherDetails,
            documents,
            scholarshipId
        } = req.body;

        if (!studentName || !studentType || !schoolOrCollegeName || !yearOrStandard || !fatherDetails || !motherDetails || !documents || !scholarshipId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the scholarship exists
        const scholarship = await Scholarship.findById(scholarshipId);
        if (!scholarship) {
            return res.status(404).json({
                message: "Scholarship not found.",
                success: false
            });
        }

        // Create the application
        const application = await Application.create({
            studentName,
            studentType,
            schoolOrCollegeName,
            yearOrStandard,
            fatherDetails,
            motherDetails,
            documents,
            scholarship: scholarshipId
        });

        return res.status(201).json({
            message: "Application submitted successfully.",
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
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
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
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
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
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
                success: false
            });
        }

        // Find and update the application status
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        application.status = status;
        await application.save();

        return res.status(200).json({
            message: `Application status updated to ${status}.`,
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};
