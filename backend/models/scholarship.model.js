import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        organizationName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        eligibility: {
            studentType: {
                type: [String],
                enum: ["school", "college"], // Can be both or either
                required: true,
                validate: {
                    validator: function (value) {
                        return value.length > 0;
                    },
                    message: "Student type must include at least one value."
                }
            },
            academicScore: {
                type: Number,
                required: true
            },
            familyIncome: {
                type: Number,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            caste:{
                type:String,
                enum: ["ST", "SC","OBC","OPEN"], // Can be both or either
                required: true,
                validate: {
                    validator: function (value) {
                        return value.length > 0;
                    },
                    message: "Student caste must include at least one value."
                }
            },
            nationality: {
                type: String,
                required: true
            }
        },
        amount: {
            type: Number,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        documentsRequired: {
            type: [String],
            required: true,
            default: ["Aadhar Card", "Last Year Marksheet", "Fee Receipt", "Father's Income Certificate", "Ration Card", "Father's/Mother's PAN Card"]
        },
        adminId: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export { Scholarship };
