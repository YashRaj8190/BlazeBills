import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import BillForm from './addbill';

// Initialize react-modal
Modal.setAppElement('#root'); // Set the root element for accessibility

const NotificationCenter = ({ setShowNotifications, showNotifications,notifications, removeNotification }) => {
  const [modalIsOpen, setModalIsOpen] = useState(showNotifications);
  const closeModal = () => {
    setModalIsOpen(false);
    setShowNotifications(false);
    
  };

  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notification Center Modal"
      >
        <div className="flex justify-center">
        <div className="w-3/4 mx-3 mt-10 p-6 bg-gray-100 rounded-md shadow-md dark:bg-slate-800 dark:text-white">
          <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-4">Notification Center</h2>
          <BillForm />
          </div>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="relative mb-2 p-2 bg-gray-300 rounded w-4/5 dark:bg-slate-600 dark:text-white ">
                <span className="font-semibold">{notification.title}:</span> {notification.body}
                <button
                  onClick={() => removeNotification(notification.billId)}
                  className="absolute top-0 right-0 p-1 cursor-pointer"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 mt-4"
          >
            Close
          </button>
        </div>
        </div>
      </Modal>
  );
};

export default NotificationCenter;
