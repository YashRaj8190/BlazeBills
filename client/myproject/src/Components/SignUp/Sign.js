import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error when user starts typing
  };

  const isStrongPassword = (value) => {
    const minLength = 8; 
    const hasUppercase = /[A-Z]/.test(value); 
    const hasLowercase = /[a-z]/.test(value); 
    const hasDigit = /[0-9]/.test(value); 
    const hasSpecialChar = /[!@#$%^&*_]/.test(value); 
    return (
      value.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const isValidName = (value) => {
    const minLength = 3;
    const containsOnlyLettersAndSpaces = /^[a-zA-Z\s]+$/.test(value);
    return value.length >= minLength && containsOnlyLettersAndSpaces;
  };

  const isValidPhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value);
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!isValidName(formData.name)) {
      newErrors.name = "Name must be only latin characters (a to z OR A to Z) and at least 3 characters long.";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Invalid or non-10-digit phone number.";
    }

    if (!isStrongPassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/user/signup", formData);
      const user = res.data.newUser;
      console.log(user);
      localStorage.removeItem('isforgetpassword');
      localStorage.setItem("email", JSON.stringify(user.email));
      if (user.isVerified) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        try {
          const response = await axios.post("http://localhost:5000/sendotp", { email: user.email });
          console.log(response.data);
          localStorage.removeItem('isforgetpassword');
          navigate("/emailverificationpage");
        } catch (err) {
          console.log(err);
          alert("Some error occurred");
        }
      }
    } catch (error) {
      if (!error.response) {
        alert("Server is not running");
        return;
      }
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data);
      }
    }
  };

  const backgroundImageUrl = 'https://wallup.net/wp-content/uploads/2017/11/23/502910-Firewatch-night-forest.jpg';

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="bg-gray-200 p-8 rounded shadow-md w-96 dark:bg-slate-800 dark:text-white bg-opacity-40 backdrop-blur-sm dark:bg-opacity-80 dark:backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:text-black"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:text-black"
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-sm font-medium text-black dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:text-black"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:text-black"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-black dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 rounded border border-gray-300 dark:text-black"
              placeholder="********"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
