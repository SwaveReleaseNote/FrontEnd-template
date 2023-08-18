/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { setCookie } from './cookie';
import {createStompClient,activateStompClient} from "./stompClientUtils";
import EventSourceComponent from './EventSourceComponent';

// interface TokenData {
//    data: string;
//    type: string;
// }
const Auth = (): JSX.Element => {
   const navigate = useNavigate();

   /* 로그인 페이지에서 Auth로 넘어오는지 log 확인 */
   const { provider } = useParams<{ provider?: string }>();

   useEffect(() => {
      (async () => {
         const pathname = window.location.search;
         const code = pathname.split('=')[1];

         if (code.length === 0) {
            // Handle the case where code is undefined
            console.log('Authorization code is missing');
            navigate('/');
            return;
         }

         console.log(code);
         // url의 인가코드
         try {
            const res = await axios.post(
               `http://localhost:3000/api/user/login-by-oauth?code=${code}&provider=${provider?.toString() ?? ''}`,
            );
            // 인가코드를 백엔드로 보내고 헤더에서 엑세스 토큰 받아옴
            // const parsedData: TokenData = JSON.parse(res.data.slice(5));

            // const tokenData = parsedData.data.replace(/"/g, '');
            console.log(res.headers.Authorization);
            const tokenData = res.data;
            console.log(tokenData);
            const token = `Bearer ${String(tokenData)}`;
            console.log(token);
            // 로컬스토리지에 저장
            window.localStorage.setItem('token', token);
            const expirationTime = new Date();
            expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);

            createStompClient(token);
            activateStompClient();
            try {
               await axios
                  .get(`http://localhost:3000/api/user`, {
                     headers: {
                        Authorization: token,
                     },
                  })
                  .then(response => {
                     // api의 응답을 제대로 받은경우
                     /* axios 값 log 확인 */
                     console.log(response.data);
                     window.localStorage.setItem('user_id', response.data.id);
                     window.localStorage.setItem('state', 'true');
                     window.localStorage.setItem('name', response.data.username);
                     window.localStorage.setItem('email', response.data.email);
                     window.localStorage.setItem('info', '');
                     window.localStorage.setItem('department', response.data.department);
                     const emailCookieKey = localStorage.getItem('email') as string;
                     
                     setCookie(emailCookieKey, token, {
                        path: '/',
                        sameSite: 'strict',
                        expires: expirationTime,
                        HttpOnly: true,
                        secure: true,
                     });
                  });
            } catch (error) {
               console.error(error);
               navigate('/');
            }finally {
               
               navigate('/admin');

            }

         } catch (error) {
            console.error(error);
            navigate('/');
         }
      })();
   }, [provider, navigate]);

   return <>   <EventSourceComponent /> </>; // Placeholder return statement as the component doesn't render anything
};

export default Auth;
