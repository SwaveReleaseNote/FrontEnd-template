import type React from 'react';
import { useEffect } from 'react';
import authImg from "../../assets/img/auth/logo-color.png";

interface NotificationProps {
  title: string;
  message: string;
}

const NotificationComponent: React.FC<NotificationProps> = ({ title, message }) => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      showNotification(title, message);
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      void Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification(title, message);
        }
      });
    }
  }, [title, message]);

  const showNotification = (title: string, message: string):void => {
    void new Notification(title, {
      body: message,
      icon: authImg, // Replace with the path to your notification icon
    });
  };

  return null; // Since the component doesn't render any JSX, return null
};

export default NotificationComponent;