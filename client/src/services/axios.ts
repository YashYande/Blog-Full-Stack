import axios from 'axios';

const API = axios.create({
  baseURL:'https://blog-full-stack-us4u.onrender.com/api',
  withCredentials: true,
});

export default API;
