/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
// import useGetSingleScholarship from '@/hooks/useGetSingleScholarship';
import axios from 'axios';
import { setSingleScholarship } from './redux/scholarshipSlice';
import { SCHOLARSHIP_API_END_POINT } from '@/utiles/constant';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const ScholarshipDescription = () => {
    const isApplied = false;
    const params=useParams();
    const scholarshipId=params.id;
    const dispatch=useDispatch();
    const { singleScholarship }= useSelector(store=>store.scholarship);
    const { user }=useSelector(store=>store.auth);
    
   // useGetSingleScholarship(scholarshipId);
    useEffect(()=>{
        const fetchSingleScholarship = async () => {
            try {
                const res = await axios.get(`${SCHOLARSHIP_API_END_POINT}/${scholarshipId}`,{withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setSingleScholarship(res.data.scholarship));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleScholarship();
    },[scholarshipId,dispatch,user?._id])
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleScholarship?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={' text-blue-700 font-bold'} variant="ghost">{singleScholarship?.deadline.split("T")[0]}</Badge>
                    <Badge className={' text-[#7209b7] font-bold'} variant="ghost" > {singleScholarship?.amount}</Badge >
                </div>
            </div>
            <Button className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{ isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleScholarship?.description}</h1>
            <div className='my-4'>
   <h1 className='font-bold'>Scholarship Name : <span className='pl-4 font-normal text-gray-800'>{singleScholarship?.title} </span></h1>
   <h1 className='font-bold'>Amount of Scholarship : <span className='pl-4 font-normal text-gray-800'>{singleScholarship?.amount}</span></h1>
   <h1 className='font-bold'>Academic  score : <span className='pl-4 font-normal text-gray-800'>{singleScholarship?.eligibility?.academicScore}</span></h1>
   <h1 className='font-bold'>Family Income : <span className='pl-4 font-normal text-gray-800'>{singleScholarship?.eligibility?.familyIncome}</span></h1>
   <h1 className='font-bold'>Age Group : <span className='pl-4 font-normal text-gray-800'>{singleScholarship?.eligibility?.age}</span></h1>
   <h1 className='font-bold'>Category: <span className='pl-4 font-normal text-gray-800'>ST</span></h1>
            </div>
        </div>
    )
}
export default ScholarshipDescription
