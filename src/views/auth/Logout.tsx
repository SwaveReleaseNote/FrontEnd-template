import React, { useRef, useEffect, type ReactElement } from 'react';
import type * as StompJs from '@stomp/stompjs';
import { useNavigate } from "react-router-dom";


const Logout = (): ReactElement => {
  const navigate = useNavigate();
  // Logout으로 넘어오는지 log 확인
  console.log("sdafafsadfsads");
  const client = useRef<StompJs.Client | null>(null);

  const disconnect = ():void => {
    console.log('disconnect');
    if ((client.current == null) || !client.current.connected) return;
     // eslint-disable-next-line @typescript-eslint/no-floating-promises
     client.current.deactivate();
   };

  useEffect(() => {
    try {
      disconnect();
        window.localStorage.clear();
        navigate("/auth/sign-in")
    } catch (error) {
      console.error(error);
    }
  }, []);

   return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
