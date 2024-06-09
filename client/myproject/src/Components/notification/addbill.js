import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Initialize react-modal
Modal.setAppElement('#root'); // Set the root element for accessibility

const BillForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user._id;
  const [billData, setBillData] = useState({
    amount: '',
    next_due_date: '',
    bill: '',
    // Add other fields as needed
  });
  //validate all fields of form
  const validateFields = () => {
    if (billData.amount.trim() === '' || billData.next_due_date.trim() === '' || billData.bill.trim() === '') {
      alert('Please fill in all fields.');
      return false;
    }

    if (!/^[+]?\d*\.?\d+$/.test(billData.amount)) {
      alert('Please enter a valid positive number for the amount.');
      return false;
    }
    const currentDate = new Date();
    const selectedDueDate = new Date(billData.next_due_date);

    if (selectedDueDate <= currentDate) {
      alert('Next due date must be greater than the present date.');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    try {
      // Make a POST request to your backend endpoint for adding bills
      console.log(localStorage.getItem('token'));
      const response = await axios.post('http://localhost:5000/user/addbill' ,{
        user_id,
        billData,
      },{
        headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      });

      console.log('Reminder set successfully:', response.data);
      alert('Reminder set successfully !!');
      closeModal(); // Close the modal on successful submission
      // Optionally, you can update your UI or show a success message to the user
    } catch (error) {
      //console.error('Error adding bill:', error.response.data.message);
      alert(error.response.data.message);
      // Handle errors, show error messages, etc.
    }
    setBillData({
      amount: '',
      next_due_date: '',
      bill: '',
      // Add other fields as needed
    })
  };

  return (
    <div>
      <button onClick={openModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded">
            Add Reminder
          </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Bill Modal"
        style={{
          overlay: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(10px)', // Add a blur effect to the background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
            content: {
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0)',
            },
          }}
      >
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-300 rounded-md shadow-md dark:bg-slate-800 dark:text-white">
          <h2 className="text-2xl font-semibold mb-6">Set Reminder</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4 ">
              <span className="text-gray-700 dark:text-white">Amount:</span>
              <input
                type="number"
                name="amount"
                value={billData.amount}
                onChange={handleInputChange}
                className="form-input pl-1 mt-1 block w-full dark:text-black"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700 dark:text-white">Due Date:</span>
              <input
                type="date"
                name="next_due_date"
                value={billData.next_due_date}
                onChange={handleInputChange}
                className="form-input pl-1 mt-1 block w-full dark:text-black"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700 dark:text-white">Bill Name:</span>
              <input
                type="text"
                name="bill"
                value={billData.bill}
                onChange={handleInputChange}
                className="form-input pl-1 mt-1 block w-full dark:text-black"
              />
            </label>
            {/* Add other fields as needed */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Set Reminder
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-gray active:bg-red-800"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BillForm;
