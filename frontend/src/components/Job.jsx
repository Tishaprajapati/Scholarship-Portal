/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = () => {
  const navigate = useNavigate();
  const jobId = "dndjksadff";
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex place-items-center justify-between'>
        {/* <p className='text-sm text-gray-500'>2 days ago</p> */}
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className=' flex items-center gap-2 my-2'>

        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Indira Gandhi Scholarship</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Benefits</h1>
        <p className='text-sm text-gray-600'> The scheme is applicable to such a single girl child who has taken admission in regular, full-time 1st year Masters Degree course in any recognized university or a post graduate college. This scholarship is available to PG-I year student only.!</p>
      </div>
      <div className = 'flex items-center gap-2 mt-4'>

        <Badge className = { ' text-blue-700 font-bold'} variant = "ghost"> Due date:25-04-2025</Badge>
        <Badge className = { ' text-[#7209b7] font-bold'} variant = "ghost" > Amount</Badge >
        </div>
        <div className='flex items-center gap-4 mt-4'>
          <Button onClick={() => navigate('/description/${jobId}')} variant="outline">Details</Button>
          <Button className="bg-[#7209b7]">Save For Later</Button>
        </div>
    </div>

  )
}
export default Job;