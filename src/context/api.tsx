import axios from 'axios';
// import { getCookie } from '../views/auth/cookie';
// const emailCookieKey = localStorage.getItem('token') as string;
const api = axios.create({
   baseURL: 'http://localhost:8080/api/',
   headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
   },
});

// Add an interceptor to set the Authorization header for each request
api.interceptors.request.use(
   config => {
      console.log('API Authorization: ', localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      if (token != null) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   async error => {
      return await Promise.reject(error);
   },
);

export default api;
