import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const availablescholarships = () => {
    return (
        <div className='text-center'>
            <div className='text-5xl font-bold'>
                <span className='mx-auto px-4 py-2  text-[#6A38C2] font-medium'><h1>Current Available Scholarships</h1></span>
            </div>
            <div className='flex flex-col gap-5 my-10'>
                <Link to="/scholarship"> <Button className='w-full my-4  text-[#391970]' style={{
                    background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
                    borderImage: "linear-gradient(to bottom, #ffffff, #f0f0f0) 1",
                    borderImageSlice: 1,
                    height: "3cm",
                }}> <h2 className="text-xl flex flex-row font-semibold text-left">Tata Trust Scholarship</h2>
                    <p className="text-md mb-4 text-right"><br /><br /><br />Organization Name: Tata Trust</p></Button></Link>
                
            </div>
        </div>
    )
};

export default availablescholarships