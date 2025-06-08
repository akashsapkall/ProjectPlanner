import axios from 'axios';
// import { useAuth } from './AuthContext';

// const { logout } =useAuth();
const api = axios.create({
  baseURL:'/api/v1'|| import.meta.env.VITE_REACT_APP_API_URL, // process.env.REACT_APP_API_URL ||
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


// api.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response?.status === 401) {
//       await logout();
//       window.location = '/login'; // Redirect to login
//     }
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// Add interceptors for error handling
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;