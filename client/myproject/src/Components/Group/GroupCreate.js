// GroupPage.js
import axios from 'axios';
import React, { useState } from 'react';

const GroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPhoneNumber, setMemberPhoneNumber] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  const createGroup = async() => {
    if (groupName.trim() === '') {
      alert('Please enter group name');
      return;
    }
    if(groupMembers.length < 1){
      alert('Please enter at least one member.');
      return;
    }
    const adminuser=JSON.parse(localStorage.getItem('user'));
    console.log(adminuser);
    const newGroup = {
      groupName: groupName,
      admin:{phone:adminuser.phone,name:adminuser.name},
      members: groupMembers,
    };
    console.log(newGroup);
    try{
      await axios.post("http://localhost:5000/user/creategroup",newGroup)
      .then((res)=>{console.log(res.data)});
      alert("group created successfully");
    }
    catch(err){
      console.log(err);
    }
    setGroupName('');
    setMemberName('');
    setMemberPhoneNumber('');
    setGroupMembers([]);
  };

  const addMember = () => {
    if (memberName.trim() === '' || memberPhoneNumber.trim() === '') {
      alert('Please enter member name and phone number.');
      return;
    }
  
    // Validate that the phone number is exactly ten digits
    if (!/^\d{10}$/.test(memberPhoneNumber)) {
      alert('Please enter a valid ten-digit phone number.');
      return;
    }
  
    setGroupMembers([...groupMembers, { name: memberName, phone: memberPhoneNumber }]);
    setMemberName('');
    setMemberPhoneNumber('');
  };
  

  const removemember = (phone) => {
    const updatedMembers = groupMembers.filter(member => member.phone!== phone);
    setGroupMembers(updatedMembers);
  };

  return (
    <div className="container mx-auto p-4 flex dark:bg-slate-800 dark:text-white min-h-screen">
    <div className="w-1/2 pr-8">
        <h1 className="text-3xl font-bold mb-4">Create a Group</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 ">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="border p-2 w-full dark:text-black"
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Add Member</label>
          <div className="flex items-center">
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="Enter member name"
              className="border p-2 mr-2 w-1/2 dark:text-black"
            />
            <input
              type="text"
              value={memberPhoneNumber}
              onChange={(e) => setMemberPhoneNumber(e.target.value)}
              placeholder="Enter member phone number"
              className="border p-2 mr-2 w-1/2 dark:text-black"
            />
            <button onClick={addMember} className="bg-green-500 text-white p-2">
              Add Member
            </button>
          </div>
        </div>

        <button onClick={createGroup} className="bg-blue-500 text-white p-2">
          Create Group
        </button>
      </div>
       
      <div className="w-1/2" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <h1 className="text-3xl font-bold mb-2 text-center">Group Name: <span className="text-4xl font-bold text-red-800">{groupName}</span></h1>
       <h1 className="text-3xl font-bold mb-2 text-center">Group Members</h1>
      <table className="min-w-full bg-white border border-gray-300 dark:bg-slate-800 text-center">
        <thead>
          <tr className="bg-gray-100 dark:text-black ">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody style={{ maxHeight: 'calc(100vh - 170px)', overflowY: 'auto' }}>
          {groupMembers.map((groupmember) => (
            <tr key={groupmember.phone} className="border-b">
              <td className="py-2 px-4 whitespace-pre-line">{groupmember.name}</td>
              <td className="py-2 px-4 whitespace-pre-line">{groupmember.phone}</td>
              <td className="py-2 px-4">
                <button onClick={() => removemember(groupmember.phone)} className="bg-red-500 text-white p-2">
                  Remove Member
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default GroupPage;
