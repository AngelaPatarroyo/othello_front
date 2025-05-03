import React, { createContext, useContext } from 'react';
import axios from 'axios';

// URL base del backend
const BASE_URL = process.env.REACT_APP_RENDER;

const endpoints = {
  register: `${BASE_URL}/user/register`,
  login: `${BASE_URL}/user/login`,
  getLeaderboard: `${BASE_URL}/leaderboard`,
  createGame: `${BASE_URL}/game/create`,
  getGame: (id) => `${BASE_URL}/game/${id}`,
  makeMove: `${BASE_URL}/game/move`, 
};

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const api = {
    endpoints,
    get: (url, config = {}) => axios.get(url, config),
    post: (url, data, config = {}) => axios.post(url, data, config),
    put: (url, data, config = {}) => axios.put(url, data, config),
    del: (url, config = {}) => axios.delete(url, config),
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
