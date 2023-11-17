import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      await axios.post("http://localhost:5000/user/signup",formData).then((res)=>{
        const user=res.data.newUser;
        //console.log(user);
        localStorage.setItem("user",JSON.stringify(user));
        navigate("/dashboard");
      }) 
    }
    catch(error){
      if(error.response.data.message){
        alert(error.response.data.message);
      }
      else{
        alert(error.response.data);
      }
      
    }
  };

  const backgroundImageUrl =
  'https://static.vecteezy.com/system/resources/previews/004/837/342/non_2x/abstract-futuristic-background-with-glowing-light-effect-vector.jpg';

  return (
    <div className="min-h-screen flex items-center justify-center "
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="bg-white p-8 rounded shadow-md w-96 dark:bg-slate-800 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-600 dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:bg-slate-800 dark:text-white"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:bg-slate-800 dark:text-white"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-sm font-medium text-gray-600 dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:bg-slate-800 dark:text-white"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-600 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:bg-slate-800 dark:text-white"
              placeholder="********"
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:bg-slate-800 dark:text-white"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
