import axios from 'axios';


let BASE_URL = process.env.REACT_APP_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("REACT_APP_PUBLIC_API_URL is not defined in your .env file");
}

if (!BASE_URL.endsWith('/')) {
  BASE_URL += '/';
}

// Define endpoints using only .env-based BASE_URL
export const endpoints = {
  register: `${BASE_URL}user/register`,
  login: `${BASE_URL}user/login`,
  getLeaderBoard: `${BASE_URL}leaderboard`,
  getUserLeaderboard: (id) => `${BASE_URL}leaderboard/${id}`,
  createGame: `${BASE_URL}game/create`,
  getGame: (id) => `${BASE_URL}game/${id}`,
  makeMove: `${BASE_URL}game/move`,
  getAllUsers: `${BASE_URL}user`,
  getAvailableUsers: `${BASE_URL}user/available`,
  deleteUser: (id) => `${BASE_URL}user/${id}`,
  updateUser: (id) => `${BASE_URL}user/${id}`,
  startGame: `${BASE_URL}game/start`,
  createGameWithOpponent: `${BASE_URL}game/challenge`,
  getAllGames: `${BASE_URL}game/`,
  getUserById: `${BASE_URL}user`
};

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Expose reusable HTTP methods
export const get = (url, config = {}) => axiosInstance.get(url, config);
export const post = (url, data, config = {}) => axiosInstance.post(url, data, config);
export const put = (url, data, config = {}) => axiosInstance.put(url, data, config);
export const del = (url, config = {}) => axiosInstance.delete(url, config);

export default axiosInstance;
