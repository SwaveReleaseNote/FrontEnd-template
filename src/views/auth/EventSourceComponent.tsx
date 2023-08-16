import React, { useEffect, useState } from 'react';
import NotificationComponent from "./NotificationComponent";
interface MyData {
  data: string;
}

const EventSourceComponent: React.FC = () => {
  const [inputText, setInputText] = useState({
    title: "",
    message: "",
  });
  const [notificationMessage, setNotificationMessage] = useState([{
    title: "",
    message: "",
  }]);

  const onChange = (event: any): void => {
    setInputText(event);
    // No need to call onSetting here, it will be called in onMessage
  }

  useEffect(() => {
    const userId =localStorage.getItem("user_id") as string;
    const eventSource = new EventSource(`http://61.109.214.110:80/api/alert/sse/emitter/${userId}`);

    eventSource.onmessage = event => {
      const eventData = JSON.parse(event.data);
      console.log('SSE data:', eventData);
      const jsonData: MyData = JSON.parse(eventData.data);
      console.log('SSE data:', jsonData.data);
      const token = eventData.data.replace(/"/g, '');
      console.log(token);
      if(token!=="Token already distributed" && eventData.type!==''){
      const parsedData = jsonData.data;
      onChange({
        "title": eventData.type,
        "message": parsedData,
      });
    }
    };

    eventSource.onerror = error => {
      console.error('SSE Error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (inputText.title !== "" && inputText.message !== "") {
      setNotificationMessage(prevMessages => [
        ...prevMessages,
        {
          title: inputText.title,
          message: inputText.message,
        }
      ]);
      setInputText({
        title: "",
        message: "",
      });
    }
  }, [inputText]);

  return (
    <div>
      {notificationMessage.map((notification, index) => (
        notification.title !=="" && (
        <NotificationComponent
          key={index}
          title={notification.title}
          message={notification.message}
        />
        )
      ))}
    </div>
  );
};

export default EventSourceComponent;
