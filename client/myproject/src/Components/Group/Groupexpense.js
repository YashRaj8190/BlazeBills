// GroupDetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FriendsModal from './FriendsModel';
import { useParams } from 'react-router-dom';

const GroupExpense = () => {
  const { groupId } = useParams();



  const admin = JSON.parse(localStorage.getItem('user'));

  const [amount, setAmount] = useState('');
  const [group, setGroup] = useState();
  const [expenseDetails, setExpenseDetails] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [groupMember,setGroupMember]=useState([]);

  // Function to open the FriendsModal
  const openFriendsModal = (id) => {
    setIsFriendsModalOpen(true);
    setTransactionId(id);
  };

  // Function to close the FriendsModal
  const closeFriendsModal = () => {
    setIsFriendsModalOpen(false);
  };

  const handleSplitAmount = async () => {
    try {
      const newTransaction = {
        groupId,
        transactionFrom: { name: admin.name, phone: admin.phone,ispaid:true},
        amount,
        expenseDetails,
        transactionMembers: selectedMembers,
      };
      setAllExpenses([]);
      await axios.post("http://localhost:5000/user/grouptransaction", newTransaction);
      alert("Transaction successful");
    } catch (err) {
      alert("Something went wrong");
      console.log("Something went wrong ", err.message);
    }

    setAmount('');
    setExpenseDetails('');
    setSelectedMembers([]);
  };

  useEffect(() => {
    const usersGroupTransaction = {
      groupId,
      userId: admin.phone,
    };

    axios.post("http://localhost:5000/user/getusersgrouptransaction", usersGroupTransaction)
      .then((res) => { setAllExpenses(res.data.data);  })
      .catch((err) => console.log("Something went wrong", err.message));
  }, [allExpenses.length]);

  useEffect(() => {
    axios.post("http://localhost:5000/user/getsinglegroup", { groupId })
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
    <div className="container px-2 flex mt-10 h-[70vh] w-full dark:text-white dark:bg-slate-800 ">
    
      <div className="w-1/2 order-2 px-5 dark:text-white dark:bg-slate-800">
        {group && allExpenses.length > 0 && (
          <>
            <h1 className="text-4xl font-semibold mb-4 text-center font-serif">{group.groupName}</h1>
            <div className="overflow-y-scroll h-80 ">
              <table className="min-w-full ">
                <thead className="bg-white top-0 dark:text-white dark:bg-slate-800">
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
                        <button onClick={() => { openFriendsModal(member._id) }} className="bg-blue-800 text-white px-2 py-1 rounded-full justify-center">Click Here</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="w-1/2 p-8 overflow-y-auto max-h-screen">
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
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Select Members</label>
            {groupMember.length>0&&
              groupMember.map((member) => (
                
                <div key={member.phone} className="flex items-center">
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
                  <label htmlFor={member.phone}>{member.name}-{member.phone}</label>
                </div>
                  
              

              ))}
          </div>
          <button type="button" onClick={handleSplitAmount} className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-800 hover:dark:bg-white hover:dark:text-black">
            Split Amount
          </button>
        </form>
      </div>
      {isFriendsModalOpen && (
        <FriendsModal onClose={closeFriendsModal} transactionId={transactionId} />
      )}
    </div>
    </div>
  );
};

export default GroupExpense;