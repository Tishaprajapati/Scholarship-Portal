/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
//import RadioGroup from '@/components//radio-group';
//import  Label from '@/components//label';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
//import { useDispatch } from 'react-redux';
//import { setSearchedQuery } from '@/redux/jobSlice';
//import RadioGroupItem from '@radix-ui/react-radio-group';

const filterData = [
  {
    filterType: "amount",
    array: [
      
      "Rs. 25000 - Rs. 50000",
      "Rs. 50000 - Rs. 100000",
      "Rs. 100000 - Rs. 300000",
      "Above 300000",
    ],
  },
  {
    filterType: "standard/year",
    array: ["atd 5-8", "std 9-12", "year 1-4"],
  },
  {
    filterType: "caste",
    array: ["ST", "SC", "OBC", "OPEN"],
  },
];

const FilterCard = ({ filters, onFilter, onClear }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Filter Scholarships</h1>
        <Button
          variant="ghost"
          onClick={onClear}
          className="text-sm text-red-500"
        >
          Clear All
        </Button>
      </div>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index} className="my-4">
          <h1 className="font-medium mb-2">{data.filterType.toUpperCase()}</h1>
          <RadioGroup
            value={filters[data.filterType]}
            onValueChange={(value) => onFilter(data.filterType, value)}
          >
            {data.array.map((item, subIndex) => (
              <div className="flex items-center space-x-2 my-2" key={subIndex}>
                <RadioGroupItem
                  value={item}
                  id={`${data.filterType}-${subIndex}`}
                />
                <Label htmlFor={`${data.filterType}-${subIndex}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
