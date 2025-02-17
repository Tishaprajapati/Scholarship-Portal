/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { useSelector } from "react-redux";

const Scholarship = ({ scholarship }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  console.log(user);
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex place-items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(scholarship?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(scholarship?.createdAt)} days ago`}
        </p>
      </div>

      <div className=" flex items-center gap-2 my-2">
        <div>
          <h1 className="font-medium text-lg">{scholarship?.title}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">
          {scholarship?.organizationName}
        </h1>
        <p className="text-sm text-gray-600"> {scholarship?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={" text-blue-700 font-bold"} variant="ghost">
          {" "}
          Due Date:
          {new Date(scholarship?.deadline).toLocaleDateString()}
        </Badge>

        <Badge className={" text-[#7209b7] font-bold"} variant="ghost">
          {" "}
          Amount {scholarship?.amount}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          className="bg-[#7209b7] text-white hover:border hover:border-[#7209b7]"
          onClick={() => navigate(`/description/${scholarship?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        {user?.role === "admin" && (
          <Button
            className="bg-[#7209b7]"
            onClick={() => navigate(`/applications/${scholarship?._id}`)}
          >
            Applications
          </Button>
        )}
      </div>
    </div>
  );
};
export default Scholarship;
