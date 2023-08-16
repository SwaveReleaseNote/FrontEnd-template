import React, { useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from './cookie';
import { useQueryClient } from 'react-query';
import {deactivateStompClient} from "./stompClientUtils";

const Logout = (): ReactElement => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   // Logout으로 넘어오는지 log 확인
   console.log('sdafafsadfsads');

   const disconnect = (): void => {
      deactivateStompClient();
   };

   useEffect(() => {
      try {
         const emailCookieKey = localStorage.getItem('email') as string;
         removeCookie(emailCookieKey, { path: '/' });
         disconnect();

         
      } catch (error) {
         console.error(error);
      } finally {
         window.localStorage.clear();
         queryClient.clear();
         navigate('/auth/sign-in');
      }
   }, []);

   return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
