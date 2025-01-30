// import { setAllJobs } from '@/redux/jobSlice'
import { setAllScholarships } from '@/components/redux/scholarshipSlice'
import { SCHOLARSHIP_API_END_POINT } from '@/utiles/constant'
// import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllScholarships = () => {
    const dispatch = useDispatch();
   // const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllScholarships = async () => {
            try {
                const res = await axios.get(`${SCHOLARSHIP_API_END_POINT}/get`,{withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllScholarships(res.data.scholarships));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllScholarships();
    },[])
}

export default useGetAllScholarships

