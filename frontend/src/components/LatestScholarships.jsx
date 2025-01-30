import React from 'react';
import LatestScholarshipCards from './LatestScholarshipCards';
import { useSelector } from 'react-redux';

const LatestScholarships = () => {
    const { allScholarships=[] } = useSelector(store => store.scholarship);

    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold">
                <span className="text-[#6A38C2]">Latest & Top</span> Available Scholarships
            </h1>
            <div className="grid grid-cols-3 gap-4 my-5">
                {
                    allScholarships.length <= 0 ? <span>No Scholarship Available</span> 
                        : allScholarships.slice(0, 6).map((scholarship) => 
                            <LatestScholarshipCards 
                                key={scholarship._id} 
                                scholarship={scholarship}
                            />
                          )
                }
            </div>
        </div>
    );
};

export default LatestScholarships;
