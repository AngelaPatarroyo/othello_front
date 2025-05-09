import React, { createContext, useContext } from 'react';
import * as apiService from '../services/api'; // Import everything from the service

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const api = {
    endpoints: apiService.endpoints,
    get: apiService.get,
    post: apiService.post,
    put: apiService.put,
    del: apiService.del,
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
