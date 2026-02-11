import axios from 'axios';

// Configure axios with base URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/'  // In production, use relative path since frontend is served from same domain as backend
  : 'http://localhost:5000'; // Backend runs on port 5000, frontend on 5173/5174

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;