/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./shared/Navbar";

import Scholarship from "./Scholarship/Scholarship";

const randomScholarships = [1, 2, 3];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results({randomScholarships.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {randomScholarships.map((item, index) => {
            return <Scholarship />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Browse;
