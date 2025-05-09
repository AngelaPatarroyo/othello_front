import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_PUBLIC_API_URL;

const endpoints = {
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

const axiosInstance = axios.create();

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, []);

  const api = {
    endpoints,
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data, config = {}) => axiosInstance.put(url, data, config),
    del: (url, config = {}) => axiosInstance.delete(url, config),
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
