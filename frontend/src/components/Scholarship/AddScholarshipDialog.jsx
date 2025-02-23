import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSelector } from "react-redux";
import axios from "axios";
import { SCHOLARSHIP_API_END_POINT } from "@/utiles/constant";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const AddScholarshipDialog = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    title: "",
    organizationName: "",
    description: "",
    eligibility: {
      studentType: [],
      academicScore: "",
      familyIncome: "",
      age: "",
      nationality: "",
      caste: [],
    },
    amount: "",
    deadline: "",
    documentsRequired: [],
    adminId: user?._id,
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
            ? prev.eligibility.caste.filter((t) => t !== type)
            : [...prev.eligibility.caste, type],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${SCHOLARSHIP_API_END_POINT}/createScholarship`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
        setInput({
          title: "",
          organizationName: "",
          description: "",
          eligibility: {
            studentType: [],
            academicScore: "",
            familyIncome: "",
            age: "",
            nationality: "",
            caste: [],
          },
          amount: "",
          deadline: "",
          documentsRequired: [],
          adminId: user?._id,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create scholarship"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5a30a4] hover:bg-[#4e2593]">
          <Plus className="mr-2 h-4 w-4" /> Add Scholarship
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Scholarship</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label>Family Income (Annual)</Label>
            <Input
              type="number"
              name="eligibility.familyIncome"
              value={input.eligibility.familyIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Age Limit</Label>
            <Input
              type="number"
              name="eligibility.age"
              value={input.eligibility.age}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Nationality</Label>
            <Input
              name="eligibility.nationality"
              value={input.eligibility.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <Label>Student Caste</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.eligibility.caste.includes("ST")}
                  onChange={() => handleCasteType("ST")}
                />
                ST
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.eligibility.caste.includes("SC")}
                  onChange={() => handleCasteType("SC")}
                />
                SC
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.eligibility.caste.includes("OBC")}
                  onChange={() => handleCasteType("OBC")}
                />
                OBC
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.eligibility.caste.includes("OPEN")}
                  onChange={() => handleCasteType("OPEN")}
                />
                OPEN
              </label>
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
            Create Scholarship
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddScholarshipDialog;