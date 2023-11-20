// FriendsModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CommentItem from './comment';
const FriendsModal = ({ onClose, transactionId }) => {
  const [transactionDetails, setTransactionDetails] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  let isAmountPaid = false;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.post('http://localhost:5000/user/getsinglegrouptransaction', { _id: transactionId })
      .then(response => {
        setTransactionDetails(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });

    // Fetch comments for the transaction (this is a mock example, not linked to the backend)
    // In a real application, you would fetch comments from the backend based on the transactionId
    
   
  }, [transactionId]);
  const handleCommentSubmit = () => {
    // Check if there's a new comment before submitting
    if (!newComment) {
      alert("enter the comment");
      return;
    }
  
    // Make an API call to submit the new comment
    axios.post('http://localhost:5000/user/addcomment', {
      transactionId,
      commentedBy: user._id, // Assuming user._id is the ID of the commenter
      comment: newComment,
    })
      .then(response => {
        // Update local state with the new comment from the backend
        console.log("commented successfully",response.data);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
        // Optionally handle the error (e.g., show an error message)
      });
      axios.post(`http://localhost:5000/user/getcommentbytransactionid`,{transactionId})
      .then(response => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };
  useEffect(() => {
    axios.post(`http://localhost:5000/user/getcommentbytransactionid`,{transactionId})
      .then(response => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [transactionId,comments.length]);
  

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

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg flex w-96">
        <div className="w-1/2 pr-4">
          <h2 className="text-3xl font-bold mb-4">{transactionDetails && transactionDetails.expenseDetails}</h2>
          {transactionDetails && (
            <div>
              {user.phone === transactionDetails.transactionFrom.phone ? (
                <ul>
                  {transactionDetails.transactionMembers.length > 0 && transactionDetails.transactionMembers.map((friend, index) => (
                    <li key={index} className="mb-4">
                      {friend.ispaid ? `${friend.name}-${friend.phone} paid ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to You` : `${friend.name}-${friend.phone} will pay ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to You`}
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
                    {transactionDetails.transactionMembers.length > 0 && transactionDetails.transactionMembers.map((friend) => {
                      if (friend.phone === user.phone) {
                        isAmountPaid = friend.ispaid;
                      }
                    })}
                    {isAmountPaid ? `You paid ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to ${transactionDetails.transactionFrom.name}-${transactionDetails.transactionFrom.phone}` : `You will pay ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to ${transactionDetails.transactionFrom.name}-${transactionDetails.transactionFrom.phone}`}
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





        {/* Right part - Comment section */}
        <div className="w-1/2 pl-4">
          <h3 className="text-xl font-bold mb-2">Comments</h3>
          <ul className="max-h-60 overflow-y-auto">
                {comments.map(comment => (
                  <CommentItem key={comment._id} comment={comment} />
                ))}
              </ul>
          {/* Comment input form */}
          <div className="mt-4">
            <textarea
              rows="4"
              className="w-full p-2 border rounded"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              Submit Comment
            </button>
          </div>
        </div>




      </div>
    </div>
  );
};

export default FriendsModal;
