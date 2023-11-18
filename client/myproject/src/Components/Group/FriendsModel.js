// FriendsModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsModal = ({ onClose, transactionId }) => {
  const [transactionDetails, setTransactionDetails] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [isAmountPaid,setIsAmountPaid]=useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  
  useEffect(() => {
    //console.log(transactionId);
    axios.post('http://localhost:5000/user/getsinglegrouptransaction', { _id: transactionId })
      .then(response => {
        setTransactionDetails(response.data[0]);
        console.log("Data fetched successfully", response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, [transactionId]);

  const markAsPaid = (phone) => {

    // Add logic for marking the transaction as paid
    setPhoneNumber(phone);
    console.log('Mark as Paid clicked');
  };
  useEffect(() => {
    if (phoneNumber) {
      // Only make the update request if phoneNumber is defined
      axios.post('http://localhost:5000/user/updatesinglegrouptransaction', { _id: transactionId, phone: phoneNumber })
        .then(response => {
          // Update local state with the new information
          console.log("Data modified successfully", response.data);
        })
        .catch(error => {
          console.error('Error fetching transactions:', error);
        });
    }
  }, [phoneNumber, transactionId]);
  useEffect(()=>{
    {transactionDetails && transactionDetails.transactionFrom.phone!==user.phone && transactionDetails.transactionMembers.map((member)=>{
      console.log("hello",member.ispaid);
      if(member.ispaid){
         setIsAmountPaid(true);
      }
    })}
  },[user.phone])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{transactionDetails && transactionDetails.expenseDetails}</h2>
        {transactionDetails && (
          <div>
            {user.phone === transactionDetails.transactionFrom.phone ? (
              <ul>
                {transactionDetails.transactionMembers.length>0 && transactionDetails.transactionMembers.map((friend, index) => (
                  <li key={index} className="mb-4">
                    {friend.ispaid ? `${friend.name} paid ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to You` : `${friend.name} will pay ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to You`}
                    <button
                      onClick={() => markAsPaid(friend.phone)}
                      disabled={friend.ispaid}
                      className={`ml-4 px-4 py-2 rounded ${friend.ispaid ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200'}`}
                    >
                      {friend.ispaid ? 'Paid' : 'Mark as Paid'}
                    </button>


                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-4">
                <p>
                  
                  {isAmountPaid?`You paid ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to ${transactionDetails.transactionFrom.name}`:`You will pay ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to ${transactionDetails.transactionFrom.name}`}
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
