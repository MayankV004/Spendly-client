import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spendly-backend-4dmv.onrender.com', 
  withCredentials: true,
  headers:{
    'Content-Type': 'application/json',
    Accept:'application/json'
  }
});

export default api;

