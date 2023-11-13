
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import the icon component

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl text-red-500 mb-4">
        <FaExclamationTriangle />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Not Found</h1>
      <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
