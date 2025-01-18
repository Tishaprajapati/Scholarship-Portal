/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Empowering Your Education Journey</span>
        <h1 className='text-5xl font-bold'>Explore, Apply & <br/> Achieve Your <span className='text-[#6A38C2]'>Scholarship Goals</span></h1>
        <p>Welcome to Scholarship, your gateway to numerous scholarship opportunities. Browse through a wide range of scholarships, tailored to your academic goals, eligibility, and location. Apply with ease and take the first step towards achieving your educational dreams. Start exploring today!</p>
        <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
           <input 
           type="text"
           placeholder='Find your dream jobs'
           className='outline-none border-none w-full'
           />
           <Button className="rounded-r-full bg-[#6A38C2]">
            <Search className='H-5 W-5'/>
           </Button>
        </div>
        <div className="flex flex-col gap-5 my-10">
            
           
        </div>
    </div>
    </div>
    
  )
}
export default HeroSection
