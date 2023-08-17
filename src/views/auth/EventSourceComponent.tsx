import React, { useEffect, useState } from 'react';
import NotificationComponent from "./NotificationComponent";

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
    let eventSource = new EventSource(`http://localhost:8080/api/sse/emitter/${userId}`);

    eventSource.onmessage = event => {
      const eventData = JSON.parse(event.data);
      console.log('SSE data:', eventData);
      // console.log('SSE data:', jsonData.data);
      // const type = eventData.data.replace(/"/g, '');
      console.log(eventData.type);

      if(eventData.type === "ALARM"){
      // const parsedData = jsonData.data;
      console.log("ALARM 새로운 알림이 왔습니다.",eventSource);
      onChange({
        "title": "새로운 알림이 왔습니다!!!",
        "message": eventData.data,
      });
    }
    };

    eventSource.onerror = () => {
      eventSource = new EventSource(`http://localhost:8080/api/sse/emitter/${userId}`);
      console.log("error",eventSource);
    };

    return () => {
      eventSource = new EventSource(`http://localhost:8080/api/sse/emitter/${userId}`);
      console.log("return",eventSource);
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
