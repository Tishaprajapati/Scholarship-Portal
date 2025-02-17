import { Scholarship } from "../models/scholarship.model.js";

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
      adminId, // Add this
    } = req.body;

    if (
      !title ||
      !organizationName ||
      !description ||
      !eligibility ||
      !amount ||
      !deadline ||
      !adminId
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
      adminId, // Include this
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
    const scholarships = await Scholarship.find({});

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
    const { studentType, academicScore, familyIncome, age,caste, nationality } =
      req.body;

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
      scholarship.eligibility.studentCaste.some((type) =>
        studentCaste.includes(type)
      ) &&
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
