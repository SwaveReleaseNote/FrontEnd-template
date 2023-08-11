import axios from 'axios';
import { getCookie } from '../views/auth/cookie';
const api = axios.create({
   baseURL: 'http://localhost:8080/api/',
   headers: {
      Authorization: getCookie('id'),
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

// // Add an interceptor to handle API response status codes
// api.interceptors.response.use(
//    response => {
//       return response;
//    },
//    async (error: AxiosError) => {
//       console.log("error.response.status", error);
//       console.log("error.response.status", error.response);
//       if (error.code !== undefined) {
//          console.log("error.response.status", error.response?.status);
//          switch (error.code) {
//             case 'ERR_NETWORK':
//                return await Promise.reject(new ApiError("Network Error", 500));
//             // case 401:
//             //    // Unauthorized - handle accordingly (e.g., redirect to login)
//             //    break;
//             // case 403:
//             //    // Forbidden - handle accordingly (e.g., show an access denied page)
//             //    break;
//             // case 404:
//             //    // Not Found - handle accordingly (e.g., show a not found page)
//             //    break;
//             // case 500:
//             //    // Internal Server Error - handle accordingly (e.g., show a server error page)
//             //    break;
//             // Add more cases as needed
//             default:
//                // Handle other errors (e.g., show a generic error page)
//                break;
//          }
//       } else {
//          // Handle request errors (e.g., no response received)
//       }

//       return await Promise.reject(error);
//    },
// );

// // Define a custom error class
// class ApiError extends Error {
//    code: number;
//    constructor(message: string | undefined, code: number) {
//       super(message);
//       this.code = code;
//       this.name = 'ApiError';
//    }
// }

export default api;
