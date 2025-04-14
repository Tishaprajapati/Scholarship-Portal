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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../shared/Navbar";

const steps = [
  "Student Information",
  "Parent Information",
  "Document Upload",
  "Review",
];

export default function ApplicationForm() {
  const [isStudentInfoSaved, setIsStudentInfoSaved] = useState(false);
  const [isParentInfoSaved, setIsParentInfoSaved] = useState(false);
  const [isDocumentsSaved, setIsDocumentsSaved] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [attemptedStep, setAttemptedStep] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("applicationFormData");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });
  const [isCheckingApproval, setIsCheckingApproval] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/application/check-approved-status",
          { withCredentials: true }
        );

        if (response.data.success && response.data.hasApprovedScholarship) {
          toast.error(
            `You already have an approved scholarship: ${response.data.scholarshipDetails.title}`
          );
          navigate("/scholarships");
        }
      } catch (error) {
        console.error(
          "Error checking scholarship status:",
          error.response?.data?.message || error.message
        );
        toast.error("Failed to check scholarship status");
        navigate("/scholarships");
      } finally {
        setIsCheckingApproval(false);
      }
    };

    checkApprovalStatus();
  }, [navigate]);

  const handleNext = () => {
    const isCurrentStepSaved = () => {
      switch (currentStep) {
        case 0:
          return isStudentInfoSaved;
        case 1:
          return isParentInfoSaved;
        case 2:
          return isDocumentsSaved;
        default:
          return true;
      }
    };

    if (!isCurrentStepSaved()) {
      setAttemptedStep(currentStep + 1);
      setShowSaveDialog(true);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };



const handleSubmit = async () => {
  if (!validateFormData()) {
    return;
  }
  setIsSubmitting(true);
  try {
    // Create FormData object to handle file uploads
    const formDataObj = new FormData();

    // Add basic form fields
    formDataObj.append("studentName", formData.studentName);
    formDataObj.append("studentType", formData.studentType);
    formDataObj.append("schoolOrCollegeName", formData.schoolOrCollegeName);
    formDataObj.append("yearOrStandard", formData.yearOrStandard);
    formDataObj.append("studentCaste", formData.studentCaste);

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

    // Sending the formData to the server for processing
    const response = await fetch(
      "http://localhost:9000/api/application/apply", // API to handle document submission
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
  } finally {
    setIsSubmitting(false);
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
      studentCaste: "Caste",
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

  const handleDialogClose = () => {
    setShowSaveDialog(false);
    setAttemptedStep(null);
  };

  const handleProceedAnyway = () => {
    setCurrentStep(attemptedStep);
    handleDialogClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StudentInfoForm
            formData={formData}
            updateFormData={updateFormData}
            setIsStudentInfoSaved={setIsStudentInfoSaved}
          />
        );
      case 1:
        return (
          <ParentInfoForm
            formData={formData}
            updateFormData={updateFormData}
            setIsParentInfoSaved={setIsParentInfoSaved}
          />
        );
      case 2:
        return (
          <DocumentUploadForm
            formData={formData}
            updateFormData={updateFormData}
            setIsDocumentsSaved={setIsDocumentsSaved}
          />
        );
      case 3:
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  if (isCheckingApproval) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Checking eligibility...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="font-sans">
       <div className="bg-white">
          <div className="flex items-center justify-between mx-auto max-w-9xl h-20 px-4">
       <div className="flex flex-row items-center gap-2 absolute top-2 left-2"> 
      <Link to="/">
        <img src="/logo.png" className="h-16 w-16" /> 
      </Link>
      <div className="font-bold text-2xl">
        Aspire<span className="text-red-600">Scholar</span>
      </div>
    </div>
  </div>
  </div>
   
    <Card className="w-full max-w-4xl mx-auto">
      {/* <div className="flex flex-row items-center gap-2">
    <Link to="/" ><img src="/logo.png" className="h-20 w-20 " /></Link>
     <div className="font-bold text-2xl">
       Aspire<span className="text-red-600">Scholar</span>
     </div>
   </div> */}
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting... Please wait" : "Submit Application"}
          </Button>
        )}
      </CardFooter>

      {showSaveDialog && (
        <Dialog open={showSaveDialog} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unsaved Changes</DialogTitle>
              <DialogDescription>
                You haven&apos;t saved your changes in the current step. Would
                you like to save before proceeding?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={handleDialogClose}>
                Go Back
              </Button>
              <Button variant="destructive" onClick={handleProceedAnyway}>
                Proceed Without Saving
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
    </div>
  );
}
