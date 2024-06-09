import React, { useState } from 'react';
import axios from 'axios';

const EmailFormModal = ({ onClose }) => {
  const [toEmail, setToEmail] = useState('');
//request to server to send invitation 
  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:5000/user/send-email', {
          toEmail,
      }, {
          headers: {
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          }
      });
      alert('Email sent successfully!');
      onClose();
  } catch (error) {
      if (error.response) {
          // Server responded with a non-success status code
          if (error.response.status === 401) {
              // Handle unauthorized access, e.g., redirect to login page
              alert('Unauthorized access. Please log in again.');
          } else {
              alert('Error sending email. Please try again later.');
          }
      } else {
          // Something else went wrong
          alert('Error sending email. Please try again.');
      }
  }
  
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg flex dark:text-white dark:bg-slate-900" >
      <div className="flex flex-col w-full">
        <h2 className="mb-4 text-xl font-bold text-center">Invite Members</h2>
        <label className="mb-4">
          <input
            className="w-full px-2 py-1 border rounded dark:text-black"
            type="email"
            placeholder='Enter email'
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
          />
        </label>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={onClose}
          >Close</button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSendEmail}
          >Invite</button>
          </div>
      </div>
    </div>
    </div>
  );
};

export default EmailFormModal;
