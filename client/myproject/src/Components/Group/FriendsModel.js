// FriendsModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsModal = ({ onClose, transactionId }) => {
  const [transactionDetails, setTransactionDetails] = useState();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.post('http://localhost:5000/user/getsinglegrouptransaction', { _id: transactionId })
      .then(response => {
        setTransactionDetails(response.data[0]);
        console.log("Data fetched successfully", response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, [transactionId]);

  const markAsPaid = () => {
    // Add logic for marking the transaction as paid
    console.log('Mark as Paid clicked');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{transactionDetails && transactionDetails.expenseDetails}</h2>
        {transactionDetails && (
          <div>
            {user.phone === transactionDetails.transactionFrom.phone ? (
              <ul>
                {transactionDetails.transactionMembers.map((friend, index) => (
                  <li key={index} className="mb-4">
                    {friend.name} will pay {(transactionDetails.amount/(transactionDetails.transactionMembers.length+1)).toFixed(2)} to You
                    <button
                      onClick={markAsPaid}
                      className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200"
                    >
                      Mark as Paid
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-4">
                <p>
                  You will pay ${(transactionDetails.amount/(transactionDetails.transactionMembers.length+1)).toFixed(2)} to {transactionDetails.transactionFrom.name}
                </p>
                
              </div>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FriendsModal;
