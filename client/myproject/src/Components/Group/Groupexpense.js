// GroupDetailPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FriendsModal from './FriendsModel';
import { useParams } from 'react-router-dom';
import EmailFormModal from './EmailFormModal';

const GroupExpense = () => {
  const { groupId } = useParams();
  const navigate=useNavigate();
  const admin = JSON.parse(localStorage.getItem('user'));

  const [amount, setAmount] = useState('');
  const [group, setGroup] = useState();
  const [expenseDetails, setExpenseDetails] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [groupMember, setGroupMember] = useState([]);

  // Function to open the FriendsModal
  const openFriendsModal = (id) => {
    setIsFriendsModalOpen(true);
    setTransactionId(id);
  };

  // Function to close the FriendsModal
  const closeFriendsModal = () => {
    setIsFriendsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInviteButtonClick = () => {
    // Open the modal when the "Invite" button is clicked
    openModal();
  };
// check whether group member is present in our database or not
  const checkUserExistence = async (phone) => {
    try {
      const response = await axios.post('http://localhost:5000/user/check-user', { phone }, {
          headers: {
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          }
      });
      return response.data.exists;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error, timeout, etc.)
          alert('Error checking user existence due to a network issue. Please check your internet connection and try again.');
      } else if (error.response) {
          // Server responded with a non-success status code
          if (error.response.status === 401) {
              // Handle unauthorized access, e.g., redirect to login page
              alert('Unauthorized access. Please log in again.');
          } else {
              alert('Error checking user existence. Please try again later.');
          }
      } else {
          // Something else went wrong
          alert('Error checking user existence. Please try again.');
      }
      return false; // Indicate that an error occurred
  }
  
  };
  const [userExistenceResults, setUserExistenceResults] = useState([]);

  useEffect(() => {
    Promise.all(
      groupMember.map(async (member) => {
        const exists = await checkUserExistence(member.phone);
        return { phone: member.phone, exists };
      })
    ).then((results) => setUserExistenceResults(results));
  }, [groupMember]);

//validate the form 
  const handleSplitAmount = async () => {
    if (amount.trim() === '') {
      alert('Please enter a amount for the expense.');
      return;
    }
    if (expenseDetails.trim() === '') {
      alert('Please enter details for the expense.');
      return;
    }
    //user can add only positive amount
    if (!/^[+]?\d*\.?\d+$/.test(amount)) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }
    if(!(selectedMembers.length>0)){
      alert("at least one member should be selected");
      return;
    }
    try {
      const newTransaction = {
        groupId,
        transactionFrom: { name: admin.name, phone: admin.phone, ispaid: true },
        amount,
        expenseDetails,
        transactionMembers: selectedMembers,
      };
      setAllExpenses([]);
      await axios.post("http://localhost:5000/user/grouptransaction", newTransaction,{
        headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      });
      alert("Transaction successful");
    } catch (err) {
      if (err.response && err?.response?.status === 401) {
        // Handle unauthorized access, e.g., redirect to login page
        alert("Unauthorized access. Redirecting to login.");
        navigate('/');
        // You can navigate to the login page or show a login modal here.
    }
      alert("Something went wrong");
      console.log("Something went wrong ", err.message);
    }

    setAmount('');
    setExpenseDetails('');
    setSelectedMembers([]);
  };
// get all transaction in which user is present
  useEffect(() => {
    const usersGroupTransaction = {
      groupId,
      userId: admin.phone,
    };

    axios.post("http://localhost:5000/user/getusersgrouptransaction", usersGroupTransaction,{
      headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    })
      .then((res) => { setAllExpenses(res.data.data); })
      .catch((err) => console.log("Something went wrong", err.message));
  }, [allExpenses.length]);
//get all members of a group and store all members except user
  useEffect(() => {
    axios.post("http://localhost:5000/user/getsinglegroup", { groupId },{
      headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    })
      .then((res) => {
        const newGroup = res.data[0];
        setGroup(res.data[0]);
        if (newGroup) {
          if (admin.phone === newGroup.admin.phone) {
            newGroup.members.forEach((member) => {
              setGroupMember((prevGroupMember) => {
                if (!prevGroupMember.some((existingMember) => existingMember.phone === member.phone)) {
                  return [...prevGroupMember, member];
                }
                return prevGroupMember;
              });
            });
          } else {
            console.log("hello", newGroup.admin);
            setGroupMember((prevGroupMember) => {
              if (!prevGroupMember.some((existingMember) => existingMember.phone === newGroup.admin.phone)) {
                return [...prevGroupMember, newGroup.admin];
              }
              return prevGroupMember;
            });
            newGroup.members.forEach((member) => {
              if (member.phone !== admin.phone) {
                setGroupMember((prevGroupMember) => {
                  if (!prevGroupMember.some((existingMember) => existingMember.phone === member.phone)) {
                    return [...prevGroupMember, member];
                  }
                  return prevGroupMember;
                });
              }
            });
          }
        }
      })
      .catch((err) => console.log("Something went wrong", err.message));
  }, [groupId]);


  return (
    <div className='dark:text-white dark:bg-gray-800'>
    <h1 className="text-center text-6xl font-serif pt-10">Split money with your group !!!</h1>
    <div className="container flex mt-10 min-h-screen dark:text-white dark:bg-slate-800 ">
    
      <div className="w-1/2 order-2 px-5 py-5 dark:text-white dark:bg-slate-800">
        {group && allExpenses.length > 0 && (
          <>
            <h1 className="text-4xl font-semibold mb-4 text-center font-serif">{group.groupName}</h1>
            <div className="overflow-y-scroll h-80 ">
              {/* show all transaction in a group */}
              <table className="min-w-full text-center border">
                <thead className="bg-gray-200 top-0 dark:text-white dark:bg-slate-900">
                  <tr>
                    <th className="py-5 px-4 border-b">Expense Details</th>
                    <th className="py-5 px-4 border-b">Amount</th>
                    <th className="py-5 px-4 border-b">Settlement</th>
                  </tr>
                </thead>
                <tbody>
                  {allExpenses.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-600 hover:text-white">
                      <td className="py-2 px-4 border-b ">{member.expenseDetails}</td>
                      <td className="py-2 px-4 border-b">{member.amount}</td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => { openFriendsModal(member._id) }} className="bg-blue-800 text-white px-2 py-1 rounded-full justify-center dark:bg-yellow-400">Click Here</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
  {/* form to split the expense among the selected group member */}
      <div className="w-1/2 p-8 overflow-y-auto max-h-screen py-5">
        <h1 className="text-3xl font-bold mb-2">Split Amount</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="border p-2 w-full dark:text-white dark:bg-slate-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Expense Details</label>
            <textarea
              value={expenseDetails}
              onChange={(e) => setExpenseDetails(e.target.value)}
              placeholder="Enter expense details"
              className="border p-2 w-full dark:text-white dark:bg-slate-800"
            />
          </div>
          {/* show all members of a group and invite button if member is not registered on website */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Select Members</label>
            {groupMember.length > 0 && 
            groupMember.map((member, index) => (
                
                <div key={member.phone} className="flex items-center pb-2">
                  <input
                    type="checkbox"
                    id={member.phone}
                    value={`${member.name}-${member.phone}`}
                    checked={selectedMembers.some((m) => m.phone === member.phone)}
                    onChange={() => {
                      const isSelected = selectedMembers.some((m) => m.phone === member.phone);

                      if (!isSelected) {
                        const updatedMembers = [...selectedMembers, { name: member.name, phone: member.phone, ispaid: false }];
                        setSelectedMembers(updatedMembers);
                      } else {
                        const updatedMembers = selectedMembers.filter((m) => m.phone !== member.phone);
                        setSelectedMembers(updatedMembers);
                      }
                    }}
                    className="mr-2 "
                  />
                  <label htmlFor={member.phone} className="flex items-center justify-between w-full">{member.name}-{member.phone}
                  {userExistenceResults[index]?.exists ? (
                  <div></div>
                   ) : (
                  <button
                    type="button"
                    onClick={handleInviteButtonClick}
                    className="bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:dark:bg-white hover:dark:text-black"
                  >
                    Invite
                  </button>
                )}
                  </label>
                  </div>

              ))}
          </div>
          <button type="button" onClick={handleSplitAmount} className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:dark:bg-white hover:dark:text-black">
            Split Amount
          </button>
        </form>
      </div>
      {/* show splited amount between members and status of expense */}
      {isFriendsModalOpen && (
        <FriendsModal onClose={closeFriendsModal} transactionId={transactionId} />
      )}
      {isModalOpen && (
      <EmailFormModal onClose={closeModal} />
      )}
    </div>
    </div>
  );
};

export default GroupExpense;