import React, { useEffect, type ReactElement } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'views/auth/cookie';
import api from 'context/api';

const Logout = (): ReactElement => {
   const navigate = useNavigate();
   // Logout으로 넘어오는지 log 확인
   console.log('sdafafsadfsads');

   useEffect(() => {
      try {
         axios
            .patch(
               'http://localhost:8080/api/user/status',
               {
                  loginState: false,
               },
               {
                  headers: {
                     Authorization: getCookie('id'),
                  },
               },
            )
            .then(response => {
               console.log(response.data); // Process the response as needed
            })
            .catch(error => {
               console.error(error);
               // Handle error cases here
            });
            
         window.localStorage.clear();

         // Clear the Authorization header in the api instance
         delete api.defaults.headers.Authorization;

         navigate('/auth/sign-in');
      } catch (error) {
         console.error(error);
      }
   }, []);

   return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
