import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const isValidEmail = (email) => {
    // Simple email validation, you can replace it with a more robust validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleForgetPassword = async (e) => {
    e.preventDefault();

    // Check if the email field is empty
    if (!email.trim()) {
      setErrorMessage('Please enter your email before clicking "Forget Password?"');
      return;
    }

    // Check if the email is valid
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Clear any previous error messages
    setErrorMessage('');

    // Add logic to handle forget password functionality
    try {
      await axios.post("http://localhost:5000/sendotp", { email: email });
      localStorage.setItem("email",JSON.stringify(email));
      localStorage.setItem("isforgetpassword",JSON.stringify(true));
      navigate("/emailverificationpage");
      // Show success message or redirect to a password reset page
    } catch (err) {
      console.log(err);
      // Handle error, show a message to the user, etc.
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:5000/user/login",{email,password});
        //console.log(res); 
      if(!res.data||!res.data.userdetails){
        alert("server error");
        return;
       }
      
        const user=res.data.userdetails;
        console.log(user);
        localStorage.setItem("email",JSON.stringify(email));
        //if user's email is verified then send it on dashboard
        if(user.isVerified){
          localStorage.setItem("user",JSON.stringify(user));
          localStorage.setItem('token',JSON.stringify(res.data.token));
          localStorage.removeItem('email');
          localStorage.removeItem('isforgetpassword');
          navigate("/dashboard");
        }
        else{
          try {
            //if user's email is not verified then verify the email
            const response=await axios.post("http://localhost:5000/sendotp", { email: email });
            localStorage.setItem("email",JSON.stringify(email));
            console.log(response.data);
            navigate("/emailverificationpage");
            // Show success message or redirect to a password reset page
          } catch (err) {
            console.log(err);
            // Handle error, show a message to the user, etc.
          }
        } 
    }
    catch(error){
      if(!error.response){
        console.log(error);
        alert("server error");
        return;
      }
      alert(error.response.data.message);
    }
  };

  const backgroundImageUrl =
  'https://wallup.net/wp-content/uploads/2017/11/23/502910-Firewatch-night-forest.jpg';
  return (
    <div
      className="min-h-screen flex items-center justify-center  dark:text-white"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg w-96 dark:bg-slate-800 dark:text-white bg-opacity-40 backdrop-blur-sm dark:bg-opacity-80 dark:backdrop-blur-sm">
        <h2 className="text-2xl text-center font-bold mb-4  dark:text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black  dark:text-white">
              Email
            </label>
            <input
            placeholder="Enter Email"
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md  dark:text-black"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black  dark:text-white">
              Password
            </label>
            <input
            placeholder="Enter Password"
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md  dark:text-black"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex items-center justify-center mt-4 ">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
          </div>

        </form>
        <div className="text-center">
          {/* Display error message if there is one */}
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )}

          {/* Forget password button */}
          <button
            onClick={handleForgetPassword}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            Forget Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



