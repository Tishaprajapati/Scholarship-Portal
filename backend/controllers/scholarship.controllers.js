import { Scholarship } from "../models/scholarship.model.js";
import { Application } from "../models/application.model.js";
import jwt from "jsonwebtoken";

// Create a new scholarship
export const createScholarship = async (req, res) => {
  try {
    const {
      title,
      organizationName,
      description,
      eligibility,
      amount,
      deadline,
      documentsRequired,
    } = req.body;
    console.log(documentsRequired);

    if (
      !title ||
      !organizationName ||
      !description ||
      !eligibility ||
      !amount ||
      !deadline
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const requiredDocs = [
      "aadharCard",
      "marksheet",
      "feeReceipt",
      "fathersIncomeCertificate",
      "rationCard",
      "fatherPanCard",
      "motherPanCard",
    ];

    const scholarship = await Scholarship.create({
      title,
      organizationName,
      description,
      eligibility,
      amount,
      deadline,
      requiredDocs,
    });

    return res.status(201).json({
      message: "Scholarship created successfully.",
      scholarship,
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

// Get all scholarships
export const getAllScholarships = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const isAdmin = decoded.isAdmin;

    let scholarships;

    if (isAdmin) {
      // Admin sees all scholarships
      scholarships = await Scholarship.find({});
    } else {
      // Non-admin users only see scholarships with future deadlines
      const currentDate = new Date();
      scholarships = await Scholarship.find({
        deadline: { $gt: currentDate },
      });
    }
    console.log(scholarships);

    if (!scholarships || scholarships.length === 0) {
      return res.status(404).json({
        message: "No scholarships found.",
        success: false,
      });
    }

    return res.status(200).json({
      scholarships,
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

export const getAllScholarshipsByAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const scholarships = await Scholarship.find({ adminId });

    if (!scholarships) {
      return res.status(404).json({
        message: "No scholarships found.",
        success: false,
      });
    }

    return res.status(200).json({
      scholarships,
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

// Get a single scholarship by ID
export const getScholarshipById = async (req, res) => {
  try {
    const scholarshipId = req.params.id;
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found.",
        success: false,
      });
    }

    return res.status(200).json({
      scholarship,
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

// Check eligibility of student for a scholarship
export const checkEligibility = async (req, res) => {
  try {
    const scholarshipId = req.params.id;
    const {
      studentType,
      academicScore,
      familyIncome,
      age,
      caste,
      nationality,
    } = req.body;

    // Find scholarship
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found.",
        success: false,
      });
    }

    // Check eligibility based on scholarship criteria
    const isEligible =
      scholarship.eligibility.studentType.some((type) =>
        studentType.includes(type)
      ) &&
      academicScore >= scholarship.eligibility.academicScore &&
      familyIncome <= scholarship.eligibility.familyIncome &&
      age <= scholarship.eligibility.age &&
      ["ST", "SC", "OBC", "OPEN"].includes(caste) &&
      nationality === scholarship.eligibility.nationality;

    if (!isEligible) {
      return res.status(400).json({
        message: "You are not eligible for this scholarship.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "You are eligible for this scholarship.",
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

export const updateScholarship = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.isAdmin) {
      return res.status(403).json({
        message: "Only admins can update scholarships",
        success: false,
      });
    }

    const scholarshipId = req.params.id;
    const updateData = req.body;

    // Find and update the scholarship
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found",
        success: false,
      });
    }

    // Check if this admin owns this scholarship
    if (scholarship.adminId !== decoded.adminId) {
      return res.status(403).json({
        message: "You can only update scholarships you created",
        success: false,
      });
    }

    // Update allowed fields
    const allowedUpdates = [
      "title",
      "organizationName",
      "description",
      "eligibility",
      "amount",
      "deadline",
      "documentsRequired",
    ];

    allowedUpdates.forEach((field) => {
      if (updateData[field] !== undefined) {
        scholarship[field] = updateData[field];
      }
    });

    await scholarship.save();

    return res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Delete a scholarship and its applications
export const deleteScholarship = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.isAdmin) {
      return res.status(403).json({
        message: "Only admins can delete scholarships",
        success: false,
      });
    }

    const scholarshipId = req.params.id;

    // Find the scholarship
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found",
        success: false,
      });
    }

    // Check if this admin owns this scholarship
    if (scholarship.adminId !== decoded.adminId) {
      return res.status(403).json({
        message: "You can only delete scholarships you created",
        success: false,
      });
    }

    // Delete all applications related to this scholarship
    await Application.deleteMany({ scholarship: scholarshipId });

    // Delete the scholarship
    await Scholarship.findByIdAndDelete(scholarshipId);

    return res.status(200).json({
      message: "Scholarship and related applications deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Search scholarships
export const searchScholarships = async (req, res) => {
  try {
    const {
      title,
      organizationName,
      minAmount,
      maxAmount,
      studentType,
      caste,
      nationality,
    } = req.query;

    // Build search query object
    const searchQuery = {};

    // Add search criteria if provided
    if (title) {
      searchQuery.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    if (organizationName) {
      searchQuery.organizationName = {
        $regex: organizationName,
        $options: "i",
      };
    }

    // Handle amount range
    if (minAmount || maxAmount) {
      searchQuery.amount = {};
      if (minAmount) searchQuery.amount.$gte = Number(minAmount);
      if (maxAmount) searchQuery.amount.$lte = Number(maxAmount);
    }

    // Handle student type
    if (studentType) {
      searchQuery["eligibility.studentType"] = studentType;
    }

    // Handle caste
    if (caste) {
      searchQuery["eligibility.caste"] = caste;
    }

    // Handle nationality
    if (nationality) {
      searchQuery["eligibility.nationality"] = nationality;
    }

    // Only show scholarships with future deadlines for non-admin users
    const token = req.cookies.token;
    let isAdmin = false;

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      isAdmin = decoded.isAdmin;
    } catch (error) {
      // Token not present or invalid - treat as non-admin
    }

    if (!isAdmin) {
      searchQuery.deadline = { $gt: new Date() };
    }

    // Execute search
    const scholarships = await Scholarship.find(searchQuery);

    if (!scholarships || scholarships.length === 0) {
      return res.status(404).json({
        message: "No scholarships found matching your criteria.",
        success: false,
      });
    }

    return res.status(200).json({
      scholarships,
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
