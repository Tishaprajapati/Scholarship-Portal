/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Pen } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from '@radix-ui/react-label';

import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog'
import { useState } from 'react';

const skills = ["90% in 10th","85% in 12th","Btech in IT"]
const isResume = true;
const Profile = () => {

    const [open,setOpen] = useState(false);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='fle justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Riya Rathod</h1>
                            <p>Student</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)}className="text-right " variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>riya@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>9939337532</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Qualifications</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Marksheet</Label>
                    {
                        isResume ? <a target='blank' href='https://youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'></a> : <span>NA</span>
                    }

                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white roundeed-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Scholarship</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}
export default Profile 