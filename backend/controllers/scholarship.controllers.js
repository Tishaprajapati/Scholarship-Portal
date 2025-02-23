import { Scholarship } from "../models/scholarship.model.js";
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

    const scholarship = await Scholarship.create({
      title,
      organizationName,
      description,
      eligibility,
      amount,
      deadline,
      documentsRequired,
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
