import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaTimes } from 'react-icons/fa';
import NotificationCenter from './notificationdata';

const Notification = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user._id;

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
useEffect(()=>{
    axios.post(`http://localhost:5000/trigger-notifications/${user_id}`)
    .then(response => {
      const upcomingBills = response.data.upcomingBills;
      console.log(upcomingBills);
      setNotifications(upcomingBills);
      setNotificationCount(upcomingBills.length); // Update notification count
    })
    .catch(error => {
      console.error('Error fetching notifications:', error);
    });
},[]);
  useEffect(() => {
    // Simulate receiving notifications (replace this with actual logic)
    const intervalId = setInterval(() => {
      // Make a GET request to your backend endpoint for fetching notifications
      axios.post(`http://localhost:5000/trigger-notifications/${user_id}`)
        .then(response => {
          const upcomingBills = response.data.upcomingBills;
          console.log(upcomingBills);
          setNotifications(upcomingBills);
          setNotificationCount(upcomingBills.length); // Update notification count
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    }, 300000); // Fetch notifications every 60 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [user_id]);

  const removeNotification = (billId) => {
    axios.post(`http://localhost:5000/removebill`, { billId })
      .then(response => {
        console.log(response);
        const updatedNotifications = notifications.filter((notification) => notification.billId !== billId);
        setNotifications(updatedNotifications);
        setNotificationCount(updatedNotifications.length); // Update notification count
      })
      .catch(error => {
        console.error('Error updating notifications:', error);
      });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div >
      <div className="flex justify-end mb-2">
        <button className={`p-2 bg-gray-200 rounded ${showNotifications ? 'text-red-500' : ''}`} onClick={toggleNotifications}>
        {notificationCount > 0 && <span className="ml-1 text-xs font-bold">{notificationCount}</span>}
          {showNotifications ? <FaTimes /> : <FaBell />}
         
        </button>
      </div>
      {showNotifications&&<NotificationCenter setShowNotifications={setShowNotifications} showNotifications={showNotifications} notifications={notifications} removeNotification={removeNotification} />}
      
    </div>
  );
};

export default Notification;
