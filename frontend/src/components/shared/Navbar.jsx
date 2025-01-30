/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
//import Button from '@mui/material/Button';
//import Button from 'react-bootstrap/Button';
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utiles/constant'
//import Button from '../shared/Button';
//import { userSelector } from 'react-redux'

const Navbar = () => 
    {
      
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-6xl h-20 px-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Scholarship<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/aboutus"><li>about us</li></Link>
                       <Link to="/contactus"> <li>contact us</li></Link>
                       <li><Link to ="/Scholarship">Scholarship</Link></li>
                        <li><Link to ="/browse">Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2 '>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#5a30a4] hover:bg-[#4e2593]">Signup</Button></Link>
                            </div>
                        ) : (
                            // <Popover>
                            //     <PopoverTrigger asChild>

                            //         <Avatar className="cursor-pointer">
                            //             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            //         </Avatar>
                            //     </PopoverTrigger>
                            //     <PopoverContent className="w-80">
                            //         <div className=''>
                            //             <div className='flex gap-4 space-y-2'>
                            //                 <Avatar className="cursor-pointer">
                            //                     <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            //                 </Avatar>
                            //                 <div>
                            //                     <h4 className='font-medium'>{user?.fullname}</h4>
                            //                     <p className='text-sm text-muted-foreground'>{user?.role}</p>
                            //                 </div>
                            //             </div>
                            //             <div className='flex flex-col my-2 text-gray-600'>
                            //                 <div className='flex w-fit items-center gap-2 cursor-pointer'>
                            //                     <User2 />
                            //                     <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                            //                 </div>
                                            
                            //             </div>
                            //         </div>

                            //     </PopoverContent>
                            // </Popover>
                      
                    
                    <Popover>
                        <PopoverTrigger asChild>

                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className=''>
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                                 <h4 className='font-medium'>{user?.fullname}</h4>
                                                 <p className='text-sm text-muted-foreground'>{user?.role}</p>
                                             </div>
                                         </div>
                                         <div className='flex flex-col my-2 text-gray-600'>
                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                 <User2 />
                                                 <Button variant="link"><Link to="/Profile">View Profile</Link></Button>
                                             </div>
                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                         </div>
                            </div>


                        </PopoverContent>
                    </Popover>
                      )
                    }
                </div>
            </div>

        </div>
    )
}
export default Navbar