import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../styles/NavBar.module.css";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications/');
        const unseenNotifications = response.data.filter(notification => !notification.read);
        setNotifications(response.data);
        setHasNewNotifications(unseenNotifications.length > 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  const handleBellClick = async () => {
    try {
      await axios.post('/api/notifications/read/');
      setHasNewNotifications(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.NotificationBell}>
      <i
        className={`fa-${hasNewNotifications ? 'solid' : 'regular'} fa-bell`}
        onClick={handleBellClick}
      ></i>
    </div>
  );
};

export default NotificationBell;
