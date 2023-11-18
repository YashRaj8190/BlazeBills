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
        transactionFrom: { name: admin.name, phone: admin.phone },
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
        console.log(res.data[0]);
        setGroup(res.data[0]);
      })
      .catch((err) => console.log("Something went wrong", err.message));
  }, [groupId]);

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/2 pr-8 overflow-y-auto max-h-screen mr-5">
        {group && allExpenses.length > 0 && (
          <>
            <h1 className="text-3xl font-bold mb-4">{group.name}</h1>
            <div className="mb-4">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Expense Details</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Settlement</th>
                  </tr>
                </thead>
                <tbody>
                  {allExpenses.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{member.expenseDetails}</td>
                      <td className="py-2 px-4 border-b">{member.amount}</td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => { openFriendsModal(member._id) }} className="bg-blue-500 text-white px-2 py-1 rounded">Click Here</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="w-1/2 pr-8 overflow-y-auto max-h-screen">
        <h1 className="text-3xl font-bold mb-2">Split Amount</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Expense Details</label>
            <textarea
              value={expenseDetails}
              onChange={(e) => setExpenseDetails(e.target.value)}
              placeholder="Enter expense details"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Select Members</label>
            {group &&group.members.length>0&&
              group.members.map((member) => (
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
                    className="mr-2"
                  />
                  <label htmlFor={member.phone}>{member.name}-{member.phone}</label>
                </div>

              ))}
          </div>
          <button type="button" onClick={handleSplitAmount} className="bg-blue-500 text-white p-2">
            Split Amount
          </button>
        </form>
      </div>
      {isFriendsModalOpen && (
        <FriendsModal onClose={closeFriendsModal} transactionId={transactionId} />
      )}
    </div>
  );
};

export default GroupExpense;
