import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentType: {
      type: String,
      enum: ["school", "college"],
      required: true,
    },
    schoolOrCollegeName: {
      type: String,
      required: true,
    },
    yearOrStandard: {
      type: String,
      required: true,
    },
    fatherDetails: {
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      employer: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
    },
    motherDetails: {
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      employer: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
    },
    documents: {
      aadharCard: {
        type: String,
        required: true,
      },
      marksheet: {
        type: String,
        required: true,
      },
      feeReceipt: {
        type: String,
        required: true,
      },
      fathersIncomeCertificate: {
        type: String,
        required: true,
      },
      rationCard: {
        type: String,
        required: true,
      },
      fatherPanCard: {
        type: String,
        required: true,
      },
      motherPanCard: {
        type: String,
        required: true,
      },
    },
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export { Application };
