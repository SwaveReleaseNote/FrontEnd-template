import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json', 
  },
});

export default api;
