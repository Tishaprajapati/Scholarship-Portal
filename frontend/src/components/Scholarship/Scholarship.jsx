/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Edit, List } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { useSelector } from "react-redux";
import EditScholarshipDialog from "./EditScholarshipDialog";

const Scholarship = ({ scholarship }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  console.log(scholarship);
  console.log(user);
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleScholarshipUpdate = (updatedScholarship) => {
    if (onUpdate) {
      onUpdate(updatedScholarship);
    }
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col h-full">
      <div className="flex place-items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(scholarship?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(scholarship?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <div>
            <h1 className="font-medium text-lg">{scholarship?.title}</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="font-bold text-lg mb-2">
            {scholarship?.organizationName}
          </h1>
          <p className="text-sm text-gray-600 line-clamp-2">
            {scholarship?.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            Due Date: {new Date(scholarship?.deadline).toLocaleDateString()}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            Amount {scholarship?.amount}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        <Button
          className="bg-[#7209b7] text-white hover:bg-[#5f32ad]"
          onClick={() => navigate(`/description/${scholarship?._id}`)}
        >
          Details
        </Button>

        {user?.role === "admin" && (
          <>
            <Button
              className="border border-[#7209b7] bg-transparent text-[#7209b7] hover:bg-[#7209b7] hover:text-white"
              onClick={() => setEditDialogOpen(true)}
              variant="outline"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              className="border border-[#7209b7] bg-transparent text-[#7209b7] hover:bg-[#7209b7] hover:text-white"
              onClick={() => navigate(`/applications/${scholarship?._id}`)}
              variant="outline"
              size="sm"
            >
              <List className="w-4 h-4 mr-1" />
              Applications
            </Button>
          </>
        )}
      </div>

      <EditScholarshipDialog
        scholarship={scholarship}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        onUpdate={handleScholarshipUpdate}
      />
    </div>
  );
};

export default Scholarship;
