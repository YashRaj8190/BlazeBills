// GroupDetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroupExpense = () => {
  const data =  [
    {
        _id: "groupA123",
        name: "Group A",
        admin: "1234567890",
        members: [
            {
                name: "MemberA1",
                phone: "1214567890",
            },
            {
                name: "MemberA2",
                phone: "1224567890",
            },
            {
                name: "MemberA3",
                phone: "1234567890",
            },
            {
                name: "MemberA4",
                phone: "1244567890",
            },
            {
                name: "MemberA5",
                phone: "9876543210",
            },
        ],
    },
    {
        _id: "groupB456",
        name: "Group B",
        admin: "1112223333",
        members: [
            {
                name: "MemberB1",
                phone: "1112223333",
            },
            {
                name: "MemberB2",
                phone: "4445556666",
            },
        ],
    },
    {
        _id: "groupC789",
        name: "Group C",
        admin: "5557778888",
        members: [
            {
                name: "MemberC1",
                phone: "5557778888",
            },
            {
                name: "MemberC2",
                phone: "9990001111",
            },
        ],
    },
];
  const group = data[0];
  const groupId = group._id;
  const admin = JSON.parse(localStorage.getItem('user'));

  const [amount, setAmount] = useState('');
  const [expenseDetails, setExpenseDetails] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  const handleSplitAmount = async () => {
    try {
      const newTransaction = {
        groupId,
        transactionFrom: `${admin.name}-${admin.phone}`,
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
      userId: `${admin.name}-${admin.phone}`,
    };

    axios.post("http://localhost:5000/user/getusersgrouptransaction", usersGroupTransaction)
      .then((res) => {setAllExpenses(res.data.data);console.log(res.data.data);})
      .catch((err) => console.log("Something went wrong", err.message));
  }, []);

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/2 pr-8">
        {allExpenses.length > 0 && (
          <>
            <h1 className="text-3xl font-bold mb-4">{group.name}</h1>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Group Members:</h2>
              <ul>
                {allExpenses.map((member, index) => (
                  <li key={index} className="mb-4">
                    <strong>Expense From:</strong> {member.transactionFrom}
                    <ul className="list-disc pl-4">
                      { member.transactionMembers.map((friend, friendIndex) => (
                        <li key={friendIndex}>
                          {friend} will pay {member.amount / (member.transactionMembers.length + 1)} to {member.transactionFrom}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="w-1/2">
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
            {group &&
              group.members.map((member) => (
                <div key={member.phone} className="flex items-center">
                  <input
                    type="checkbox"
                    id={member.phone}
                    value={`${member.name}-${member.phone}`}
                    checked={selectedMembers.includes(`${member.name}-${member.phone}`)}
                    onChange={() => {
                      const memberId = `${member.name}-${member.phone}`;
                      const updatedMembers = selectedMembers.includes(memberId)
                        ? selectedMembers.filter((member) => member !== memberId)
                        : [...selectedMembers, memberId];
                      setSelectedMembers(updatedMembers);
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
    </div>
  );
};

export default GroupExpense;
