// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
    const email = JSON.parse(localStorage.getItem('email'));
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Clear any previous error messages
    setErrorMessage('');

    // Send a request to your server to handle the password reset
    try {
      await axios.post('http://localhost:5000/resetpassword', {
        password: formData.password,
        email:email,
        // Include any necessary tokens or identifiers for the reset process
      });
      localStorage.removeItem("isforgetpassword");
      localStorage.removeItem("email");
      navigate("/");
      
      // Display a success message or redirect to the login page
      alert('Password reset successful');
    } catch (err) {
      console.error('Password reset failed', err);
      // Handle error, display a message to the user, etc.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-5 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="New Password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Confirm Password"
              required
            />
          </div>
          {/* Display error message if there is one */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
