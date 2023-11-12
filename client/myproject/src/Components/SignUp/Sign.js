import React, { useState } from "react";

function Signup(){
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const backgroundImageUrl =
  'https://static.vecteezy.com/system/resources/previews/004/837/342/non_2x/abstract-futuristic-background-with-glowing-light-effect-vector.jpg';

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300"
              placeholder="********"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300"
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
