/* eslint-disable no-unused-vars */
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
const LatestJobCards = () => {
    return (

        <div className='p-5 rounded-d shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Scholarship Name</h1> 
                <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
       <h1 className = 'font-bold text-lg my-2' > Scholarship Title</h1 >
       <p  className ='text-sm text-gray -600'> Description of scholarship</p>
</div >
<div className = 'flex items-center gap-2 mt-4'>

        <Badge className = { ' text-blue-700 font-bold'} variant = "ghost"> Apply before 20 jan</Badge>
        <Badge className = { ' text-[#7209b7] font-bold'} variant = "ghost" > Amount</Badge >
        </div >
</div >

 )
}
export default LatestJobCards