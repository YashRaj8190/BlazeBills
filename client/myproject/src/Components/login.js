import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/user/login",{email,password}).then((res)=>{
        const user=res.data.userdetails;
        console.log(user);
        localStorage.setItem("user",JSON.stringify(user));
        navigate("/");
      }) 
    }
    catch(error){
      alert(error.response.data.message);
    }
  };

  const backgroundImageUrl =
  'https://static.vecteezy.com/system/resources/previews/004/837/342/non_2x/abstract-futuristic-background-with-glowing-light-effect-vector.jpg';
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
            placeholder="Enter Email"
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
            placeholder="Enter Password"
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex items-center justify-center mt-4">
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
  >
    Login
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default Login;
