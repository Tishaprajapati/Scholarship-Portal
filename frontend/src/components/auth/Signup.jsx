import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "../shared/Navbar";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utiles/constant";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    dob: "",
    gender: "",
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const dob = input.dob.split("-").reverse().join("-"); // Convert DOB to dd-mm-yyyy
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("dob", dob);
    formData.append("gender", input.gender);

    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(res.data);
      if (res.data.success) {
        toast(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter Email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Password"
            />
          </div>
          <div className="my-2">
            <Label>Date of Birth</Label>
            <Input
              type="Date"
              value={input.dob}
              name="dob"
              onChange={changeEventHandler}
              placeholder="00-00-0000"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />

                <Label htmlFor="r1">student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "admin"}
                  onChange={changeEventHandler}
                  value="admin"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">admin</Label>
              </div>
            </RadioGroup>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="gender"
                  checked={input.gender === "female"}
                  onChange={changeEventHandler}
                  value="female"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="gender"
                  checked={input.gender === "male"}
                  onChange={changeEventHandler}
                  value="male"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={input.gender === "others"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />

                <Label htmlFor="r1">others</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2"></div>
          </div>
          <Button type="submit" className="w-full my-4">
            SignUp
          </Button>

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
