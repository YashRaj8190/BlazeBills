import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

// Initialize react-modal
Modal.setAppElement('#root'); // Set the root element for accessibility

const NotificationCenter = ({ setShowNotifications, showNotifications,notifications, removeNotification }) => {
  const [modalIsOpen, setModalIsOpen] = useState(showNotifications);
  const closeModal = () => {
    setModalIsOpen(false);
    setShowNotifications(false);
    
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notification Center Modal"
      >
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Notification Center</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="relative mb-2 p-2 bg-gray-100 rounded">
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
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 mt-4"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationCenter;
