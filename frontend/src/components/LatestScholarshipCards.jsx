/* eslint-disable no-unused-vars */
import React from 'react';
import { Badge } from './ui/badge';
// import { useNavigate } from 'react-router-dom'
const LatestScholarshipCards = ({scholarship}) => {
  return (
    <div
     // onClick={() => navigate(`/description/${scholarship._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{scholarship?.title}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2"> {scholarship?.organizationName}</h1>
        <p className="text-sm text-gray -600">{scholarship?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={" text-blue-700 font-bold"} variant="ghost">
          {" "}
          Apply before {new Date(scholarship?.deadline).toISOString().split('T')[0]}
        </Badge>
        <Badge className={" text-[#7209b7] font-bold"} variant="ghost">
          {" "}
          {scholarship?.amount}
        </Badge>
      </div>
    </div>
  );
};
export default LatestScholarshipCards;