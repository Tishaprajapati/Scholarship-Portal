/* eslint-disable no-unused-vars */
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
const ScholarshipDescription = () => {
    const isApplied = false;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>Indira Gandhi Scholarship</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={' text-blue-700 font-bold'} variant="ghost">Apply before 25 jan</Badge>
                    <Badge className={' text-[#7209b7] font-bold'} variant="ghost" > Amount</Badge >
                </div>
            </div>
            <Button className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{ isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Scholarship Description</h1>
            <div className='my-4'>
   <h1 className='font-bold'>Scholarship Name : <span className='pl-4 font-normal text-gray-800'>Indira Gandhi Scholarship</span></h1>
   <h1 className='font-bold'>Amount of Scholarship : <span className='pl-4 font-normal text-gray-800'>100000</span></h1>
   <h1 className='font-bold'>Eligibility : <span className='pl-4 font-normal text-gray-800'>The scheme is applicable to such a single girl child who has taken admission in regular, full-time 1st year Masters Degree course in any recognized university or a post graduate college.</span></h1>
   <h1 className='font-bold'>Family Income : <span className='pl-4 font-normal text-gray-800'>300000</span></h1>
   <h1 className='font-bold'>Age Group : <span className='pl-4 font-normal text-gray-800'>18-25</span></h1>
   <h1 className='font-bold'>Category: <span className='pl-4 font-normal text-gray-800'>ST</span></h1>
            </div>
        </div>
    )
}
export default ScholarshipDescription
