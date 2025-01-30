/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';

import Scholarship from './Scholarship';
import { useSelector } from 'react-redux';

//const scholarshipsArray = [1,2,3,4,5,6,7,8];

const Scholarships = () => {
  const { allScholarships=[] } = useSelector(store => store.scholarship);
  

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>
          {
            allScholarships.length <= 0 ? <span>Scholarship not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    allScholarships.map((scholarship) => 
                      <Scholarship
                    key={scholarship._id} 
                    scholarship={scholarship}
                />
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default Scholarships;