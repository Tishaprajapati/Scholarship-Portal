/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utiles/constant";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      {/* <div className="flex items-center justify-between mx-auto max-w-6xl h-20 px-4"> */}
      <div
  className="flex items-center justify-between mx-auto max-w-6xl h-20"
  style={{ paddingLeft: "5%", paddingRight: "5%" }}
>
        <div className="flex flex-row items-center gap-2">
         <Link to="/" ><img src="/logo.png" className="h-20 w-20 " /></Link>
          <div className="font-bold text-2xl">
            Aspire<span className="text-red-600">Scholar</span>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <Link to="/">
              <li>Home</li>
            </Link>
           
            <li>
              <Link to="/Scholarship">Scholarship</Link>
            </li>
            <Link to="/aboutus">
              <li>AboutUs</li>
            </Link>
            <Link to="/contactus">
              {" "}
              <li>ContactUs</li>
            </Link>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 ">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#5a30a4] hover:bg-[#4e2593]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
              
            <Avatar className="h-10 w-10">
              <AvatarImage className="cursor-pointer"
                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                alt="profile"
              />
            </Avatar>
            
            
            
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white p-3 shadow-sm drop-shadow  shadow-black rounded-lg">
                <div className="">
                <div className="flex items-center gap-4">
                    <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                alt="profile"
              />
            </Avatar>
            
                    
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/Profile">View Profile</Link>
                      </Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
