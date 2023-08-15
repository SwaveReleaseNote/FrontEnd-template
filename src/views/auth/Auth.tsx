/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { setCookie } from './cookie';

const Auth = (): JSX.Element => {
   const navigate = useNavigate();

   /* 로그인 페이지에서 Auth로 넘어오는지 log 확인 */
   const { provider } = useParams<{ provider?: string }>();
   const client = useRef<StompJs.Client | null>(null);

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
               `http://localhost:8080/api/user/login-by-oauth?code=${code}&provider=${provider?.toString() ?? ''}`,
            );
            // 인가코드를 백엔드로 보내고 헤더에서 엑세스 토큰 받아옴
            const token = res.headers.authorization;
            console.log(token);
            // 로컬스토리지에 저장
            window.localStorage.setItem('token', token);
            // setCookie("id", token);
            const expirationTime = new Date();
            expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);

            setCookie('id', token, {
               path: '/',
               sameSite: 'strict',
               expires: expirationTime,
               HttpOnly: true,
               secure: true,
            });
            client.current = new StompJs.Client({
               brokerURL: 'ws://localhost:8080/ws-stomp',
               // eslint-disable-next-line @typescript-eslint/no-empty-function
               connectHeaders: {
                  Authorization: token,
               },
               onConnect: () => {
                  console.log('success');
               },
            });
            client.current.activate();
            try {
               await axios
                  .get(`http://localhost:8080/api/user`, {
                     headers: {
                        Authorization: token,
                     },
                  })
                  .then(response => {
                     // api의 응답을 제대로 받은경우
                     /* axios 값 log 확인 */
                     console.log(response.data);
                     window.localStorage.setItem('state', 'true');
                     window.localStorage.setItem('name', response.data.username);
                     window.localStorage.setItem('email', response.data.email);
                     window.localStorage.setItem('info', '');
                     window.localStorage.setItem('department', response.data.department);
                     console.log(localStorage.getItem('email'));
                     console.log(localStorage.getItem('department'));
                  });
            } catch (error) {
               console.error(error);
               navigate('/');
            } finally {
               navigate('/admin');
            }
         } catch (error) {
            console.error(error);
            navigate('/');
         }
      })();
   }, [provider, navigate]);

   return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Auth;
