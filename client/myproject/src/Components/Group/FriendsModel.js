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
// fetch a single transaction using transaction id
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.post('http://localhost:5000/user/getsinglegrouptransaction', { _id: transactionId }, {
              headers: {
                  "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              }
          });
          setTransactionDetails(response.data[0]);
      } catch (error) {
          if (axios.isAxiosError(error)) {
              // Axios error (e.g., network error, timeout, etc.)
              alert('Error fetching transactions due to a network issue. Please check your internet connection and try again.');
          } else if (error.response) {
              // Server responded with a non-success status code
              if (error.response.status === 401) {
                  // Handle unauthorized access, e.g., redirect to login page
                  alert('Unauthorized access. Please log in again.');
              } else {
                  alert('Error fetching transactions from the server. Please try again later.');
              }
          } else {
              // Something else went wrong
              alert('Error fetching transactions. Please try again.');
          }
      }
  };

  fetchData();
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
    commentedBy: user._id,
    comment: newComment,
}, {
    headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    }
})
    .then(response => {
        // Update local state with the new comment from the backend
        setNewComment('');
    })
    .catch(error => {
        if (axios.isAxiosError(error)) {
            // Axios error (e.g., network error, timeout, etc.)
            alert('Error submitting comment due to a network issue. Please check your internet connection and try again.');
        } else if (error.response) {
            // Server responded with a non-success status code
            if (error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login page
                alert('Unauthorized access. Please log in again.');
            } else {
                alert('Error submitting comment. Please try again later.');
            }
        } else {
            // Something else went wrong
            alert('Error submitting comment. Please try again.');
        }
    });

    axios.post(`http://localhost:5000/user/getcommentbytransactionid`, { transactionId }, {
      headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
  })
      .then(response => {
          setComments(response.data);
      })
      .catch(error => {
          if (axios.isAxiosError(error)) {
              // Axios error (e.g., network error, timeout, etc.)
              alert('Error fetching comments due to a network issue. Please check your internet connection and try again.');
          } else if (error.response) {
              // Server responded with a non-success status code
              if (error.response.status === 401) {
                  // Handle unauthorized access, e.g., redirect to login page
                  alert('Unauthorized access. Please log in again.');
              } else {
                  alert('Error fetching comments from the server. Please try again later.');
              }
          } else {
              // Something else went wrong
              alert('Error fetching comments. Please try again.');
          }
      });
  
  };
  //fetch all comments related to particular transaction
  useEffect(() => {
    axios.post(`http://localhost:5000/user/getcommentbytransactionid`, { transactionId }, {
      headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
  })
      .then(response => {
          setComments(response.data);
      })
      .catch(error => {
          alert('Error fetching comments. Please try again.');
      });
  
  }, [transactionId,comments.length]);
  

  const markAsPaid = (phone) => {
    // Add logic for marking the transaction as paid
    setPhoneNumber(phone);
    window.location.reload();
    console.log('Mark as Paid clicked');
  };

  
  //modified the data if user pays the amount
  useEffect(() => {
    if (phoneNumber) {
      // Only make the update request if phoneNumber is defined
      axios.post('http://localhost:5000/user/updatesinglegrouptransaction', { _id: transactionId, phone: phoneNumber }, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
    })
        .then(response => {
            // Update local state with the new information
            alert('Data modified successfully');
        })
        .catch(error => {
           if (error.response) {
                // Server responded with a non-success status code
                if (error.response.status === 401) {
                    // Handle unauthorized access, e.g., redirect to login page
                    alert('Unauthorized access. Please log in again.');
                } else {
                    alert('Error modifying data. Please try again later.');
                }
            } else {
                // Something else went wrong
                alert('Error modifying data. Please try again.');
            }
        });
    
    }
  }, [phoneNumber, transactionId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg flex w-4/6 dark:text-white dark:bg-slate-800">
        <div className="w-1/2 pr-4">
          <h2 className="text-3xl font-bold mb-4">{transactionDetails && transactionDetails.expenseDetails}</h2>
        {/* show all members that are part of transactions and those status of expense */}
          {transactionDetails && (
            <div>
              {user.phone === transactionDetails.transactionFrom.phone ? (
                <ul>
                  {transactionDetails.transactionMembers.length > 0 && transactionDetails.transactionMembers.map((friend, index) => (
                    <li key={index} className="mb-2 p-1 flex justify-between items-center">
                      {friend.ispaid ? `${friend.name}-${friend.phone} paid ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to You` : `${friend.name}-${friend.phone} will pay ${(transactionDetails.amount / (transactionDetails.transactionMembers.length + 1)).toFixed(2)} to You`}
                      {/* if user paid you then mark it paid */}
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
              className="w-full p-2 border rounded dark:text-white dark:bg-slate-800"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-800"
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