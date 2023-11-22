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

    try {
      // Make a POST request to your backend endpoint for adding bills
      const response = await axios.post('http://localhost:5000/user/addbill', {
        user_id,
        billData,
      });

      console.log('Bill added successfully:', response.data);
      closeModal(); // Close the modal on successful submission
      // Optionally, you can update your UI or show a success message to the user
    } catch (error) {
      console.error('Error adding bill:', error);
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
      <button onClick={openModal} className="bg-gray-800 font-bold py-2 px-4 rounded-md block text-white">
        Add Bill
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Bill Modal"
      >
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Add Bill</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Amount:</span>
              <input
                type="number"
                name="amount"
                value={billData.amount}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Next Due Date:</span>
              <input
                type="date"
                name="next_due_date"
                value={billData.next_due_date}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Bill Name:</span>
              <input
                type="text"
                name="bill"
                value={billData.bill}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full"
              />
            </label>
            {/* Add other fields as needed */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Add Bill
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
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
