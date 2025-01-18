// /* eslint-disable react/jsx-key */
// /* eslint-disable no-unused-vars */
// import React from 'react'
// import { RadioGroup } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'
// import { RadioGroupItem } from '@radix-ui/react-radio-group'

// const fitlerData = [
//   {
//     fitlerType: "Location",
//     array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
//   },
//   {
//     fitlerType: "Industry",
//     array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//   },
//   {
//     fitlerType: "Salary",
//     array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
//   },
// ]

// const FilterCard = () => {

//   return (
//     <div>
//       <h1 className='font-bold text-lg'>Filter Jobs</h1>
//       <hr className='mt-3' />
//       <RadioGroup>
//         {
//           fitlerData.map((data, index) => (
//             <div>
//               <h1>{data.fitlerType}</h1>
//               {
//                 data.array.map(Item,index) => {
//                   return (
//                     <div className='flex items-center space-x-2 my-2'>
//                       <RadioGroupItem value={item}/>
//                       <Label>{item}</Label>
//                     </div>
//                   )
//                 })
//               }
//             </div>
//           ))
//         }
//       </RadioGroup>
//     </div>
//   )
// }

// export default FilterCard
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';
//import RadioGroup from './ui/radio-group';
//import  Label from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
//import { useDispatch } from 'react-redux';
//import { setSearchedQuery } from '@/redux/jobSlice';
//import RadioGroupItem from '@radix-ui/react-radio-group';

const filterData = [
  {
    filterType: "Amount",
    array: ["Rs. 0 - Rs. 25000", "Rs. 25000 - Rs. 50000", "Rs. 50000 - Rs. 100000", "Above 100000"]
  },
  {
    filterType: "Age",
    array: ["1-18", "19-25", "26-40","40 and above"]
  },
  {
    filterType: "Cast",
    array: ["ST", "SC", "OBC","OPEN"]
  },
];

const FilterCard = () => {

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1>{data.filterType}</h1>
              {
                data.array.map((item, subIndex) => {
                  return (
                    <div className='flex items-center space-x-2 my-2' key={subIndex}>
                      <RadioGroupItem value={item} />
                      <Label>{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
