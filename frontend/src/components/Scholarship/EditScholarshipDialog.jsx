import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import axios from "axios";
import { SCHOLARSHIP_API_END_POINT } from "@/utiles/constant";
import { toast } from "sonner";

const EditScholarshipDialog = ({ scholarship, open, setOpen, onUpdate }) => {
  const [input, setInput] = useState({
    title: scholarship?.title || "",
    organizationName: scholarship?.organizationName || "",
    description: scholarship?.description || "",
    eligibility: {
      studentType: scholarship?.eligibility?.studentType || [],
      academicScore: scholarship?.eligibility?.academicScore || "",
      familyIncome: scholarship?.eligibility?.familyIncome || "",
      age: scholarship?.eligibility?.age || "",
      nationality: scholarship?.eligibility?.nationality || "",
      caste: scholarship?.eligibility?.caste || [],
    },
    amount: scholarship?.amount || "",
    deadline: scholarship?.deadline?.split("T")[0] || "",
    documentsRequired: scholarship?.documentsRequired || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setInput((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStudentType = (type) => {
    setInput((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        studentType: prev.eligibility.studentType.includes(type)
          ? prev.eligibility.studentType.filter((t) => t !== type)
          : [...prev.eligibility.studentType, type],
      },
    }));
  };

  const handleCasteType = (type) => {
    setInput((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        caste: prev.eligibility.caste.includes(type)
          ? prev.eligibility.caste.filter((c) => c !== type)
          : [...prev.eligibility.caste, type],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${SCHOLARSHIP_API_END_POINT}/${scholarship._id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
        onUpdate(res.data.scholarship);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Successfully updated scholarship"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Scholarship</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields similar to AddScholarshipDialog */}
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={input.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Organization Name</Label>
            <Input
              name="organizationName"
              value={input.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={input.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Student Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.eligibility.studentType.includes("school")}
                  onChange={() => handleStudentType("school")}
                />
                School
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.eligibility.studentType.includes("college")}
                  onChange={() => handleStudentType("college")}
                />
                College
              </label>
            </div>
          </div>

          <div>
            <Label>Academic Score (Percentage)</Label>
            <Input
              type="number"
              name="eligibility.academicScore"
              value={input.eligibility.academicScore}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Caste Category</Label>
            <div className="flex gap-4">
              {["SC", "ST", "OBC", "OPEN"].map((caste) => (
                <label key={caste} className="flex items-center gap-2">
                  <input type="checkbox" checked={input.eligibility.caste.includes(caste)} onChange={() => handleCasteType(caste)} />
                  {caste}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              value={input.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Deadline</Label>
            <Input
              type="date"
              name="deadline"
              value={input.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#5a30a4] hover:bg-[#4e2593]"
          >
            Update Scholarship
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditScholarshipDialog;
