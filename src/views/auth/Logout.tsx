import React, { useRef, useEffect, type ReactElement } from 'react';
import type * as StompJs from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from './cookie';
import { useQueryClient } from 'react-query';

const Logout = (): ReactElement => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   // Logout으로 넘어오는지 log 확인
   console.log('sdafafsadfsads');
   const client = useRef<StompJs.Client | null>(null);

   const disconnect = async (): Promise<void> => {
      console.log('disconnect');
      if (client.current == null || !client.current.connected) return;

      try {
         await client.current.deactivate();
      } catch (error) {
         console.error('Error deactivating client:', error);
      }
   };

   useEffect(() => {
      try {
         const emailCookieKey = localStorage.getItem('email') as string;
         removeCookie(emailCookieKey, { path: '/' });
         disconnect()
            .then(() => {
               console.log("logout");
            })
            .catch(error => {
               console.error('Error during disconnect:', error);
            });
         window.localStorage.clear();

         navigate('/auth/sign-in');
      } catch (error) {
         console.error(error);
      } finally {
         queryClient.clear();
      }
   }, []);

   return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
