import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const navigate=useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsTimerExpired(true);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleVerifyClick = async () => {
    const email = JSON.parse(localStorage.getItem('email'));

    axios
      .post('http://localhost:5000/verifyotp', { email, enteredOTP: otp })
      .then((response) => {
        console.log(response);
        alert("otp verified successfully");
        const isforgetpassword=JSON.parse(localStorage.getItem("isforgetpassword"));
        if(isforgetpassword){
            navigate("/resetpassword");
        }
        else{
            const user=response.data.updatedUser;
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.removeItem('email');
            navigate("/dashboard");
            
        }
        
        // You can redirect the user or perform other actions upon successful verification
      })
      .catch((error) => {
        console.error(error);
        alert('OTP verification failed');
      });
  };

  const handleResendClick = async () => {
    const email = JSON.parse(localStorage.getItem('email'));

    axios
      .post('http://localhost:5000/sendotp', { email })
      .then((response) => {
        console.log(response.data);
        alert('New OTP sent successfully');
        setTimer(60); // Reset the timer to the initial duration
        setIsTimerExpired(false);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to resend OTP');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          OTP Verification
        </h2>
        <p className="text-gray-600 mb-6">
          Please enter the OTP sent to your email address to complete the verification.
        </p>
        <div className="mb-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
          />
        </div>
        <div className="mb-6">
          {isTimerExpired ? (
            <p className="text-red-500">OTP has expired. Please request a new one.</p>
          ) : (
            <p className="text-gray-600">
              Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleVerifyClick}
            disabled={isTimerExpired}
            className={`${
              isTimerExpired ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mr-2`}
          >
            Verify OTP
          </button>
          <button
            onClick={handleResendClick}
            disabled={!isTimerExpired}
            className={`${
              !isTimerExpired ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
            } text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green`}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
