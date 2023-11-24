import React, { useState } from 'react';
import {FaUserCircle, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

const AboutUs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>About Us</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="About Us Modal"
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
            position: 'relative',
            maxWidth: '800px', // Set a max width if desired
            height: '80%', // Adjust the height as needed
            maxHeight: '500px', // Set a max height if desired
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
        }}
      >
        <div className="text-right mb-2">
          <button onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <h2 className='text-center text-3xl'>About Us</h2>
        <div className='text-2xl my-2 p-1'>Welcome to BlazeBills, your dedicated partner in expense tracking. At BlazeBills, we understand the importance of staying in control of your expenses. Our platform is designed to simplify the process of tracking and managing your expenditures effortlessly.</div>
        <h2 className='text-center text-2xl mb-1'>Our Team:</h2>
        <div className="flex justify-center text-center">
          <div className='mr-5'>
          <FaUserCircle size={150} className="text-blue-500 mx-auto py-1"/> 
            <p><strong>Sushmit Patel</strong></p>
            <p>Contact-sushmit.20223282@mnnit.ac.in</p>
          </div>
          <div className='mr-5'>
            <FaUserCircle size={150} className=" text-red-500 mx-auto py-1"/>
            <p><strong>Yash Raj</strong></p>
            <p>Contact-yash.20223321@mnnit.ac.in</p>
          </div>
          <div >
          <FaUserCircle size={150} className="text-yellow-500 mx-auto py-1 "/>
            <p><strong>Aditya Raj</strong></p>
            <p>Contact-aditya.20223020@mnnit.ac.in</p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default AboutUs;
