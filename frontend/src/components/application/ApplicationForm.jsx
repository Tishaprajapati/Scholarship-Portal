"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StudentInfoForm from "./StudentInfoForm";
import ParentInfoForm from "./ParentInfoForm";
import DocumentUploadForm from "./DocumentUploadForm";
import ReviewForm from "./ReviewForm";

const steps = 
[
  "Student Information",
  "Parent Information",
  "Document Upload",
  "Review",
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("applicationFormData");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateFormData()) {
      return;
    }
    try
     {
      // Create FormData object to handle file uploads
      const formDataObj = new FormData();

      // Add basic form fields
      formDataObj.append("studentName", formData.studentName);
      formDataObj.append("studentType", formData.studentType);
      formDataObj.append("schoolOrCollegeName", formData.schoolOrCollegeName);
      formDataObj.append("yearOrStandard", formData.yearOrStandard);
      formDataObj.append("stdentCaste",formData.studentCaste);
      // Add parent details
      formDataObj.append(
        "fatherDetails",
        JSON.stringify(formData.fatherDetails)
      );
      formDataObj.append(
        "motherDetails",
        JSON.stringify(formData.motherDetails)
      );

      // Get scholarshipId from URL
      const scholarshipId = window.location.pathname.split("/apply/")[1];
      formDataObj.append("scholarshipId", scholarshipId);

      // Add documents
      if (formData.documents) {
        Object.entries(formData.documents).forEach(([key, file]) => {
          formDataObj.append(key, file);
        });
      }
      console.log("formData", formData);
      console.log("formDataObj", formDataObj);

      const response = await fetch(
        "http://localhost:9000/api/application/apply",
        {
          method: "POST",
          body: formDataObj,
          credentials: "include", // Important for auth
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Application submitted successfully!");
        setFormData({});
        setCurrentStep(0);
        localStorage.removeItem("applicationFormData");
      } else {
        alert("Error submitting application: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting the application.");
    }
  };

  const updateFormData = (newData) => {
    console.log(newData);
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const validateFormData = () => {
    const requiredFields = {
      studentName: "Student Name",
      studentType: "Student Type",
      schoolOrCollegeName: "School/College Name",
      yearOrStandard: "Year/Standard",
      sudentCaste: "Caste",
      fatherDetails: "Father Details",
      motherDetails: "Mother Details",
      documents: "Documents",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        alert(`${label} is required`);
        return false;
      }
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

    for (const doc of requiredDocs) {
      if (!formData.documents?.[doc]) {
        alert(`${doc.replace(/([A-Z])/g, " $1").trim()} is required`);
        return false;
      }
    }

    return true;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StudentInfoForm
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <ParentInfoForm formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <DocumentUploadForm
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Scholarship Application</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          value={(currentStep / (steps.length - 1)) * 100}
          className="mb-4"
        />
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <span
              key={step}
              className={`text-sm ${
                index === currentStep
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Application</Button>
        )}
      </CardFooter>
    </Card>
  );
}
