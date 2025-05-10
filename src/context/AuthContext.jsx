import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const logoutTimer = useRef(null);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  };

  const startLogoutTimer = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000 - Date.now(); // convert to ms

      if (expiryTime > 0) {
        logoutTimer.current = setTimeout(() => {
          logout();
          console.warn('Session expired. User logged out automatically.');
        }, expiryTime);
      } else {
        logout(); // already expired
      }
    } catch (err) {
      console.error('Invalid token:', err);
      logout();
    }
  }, []);

  const login = async (email, password, loginUrl) => {
    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Login failed');
      }

      const data = await res.json();

      const normalizedUser = {
        id: data.user.id || data.user.Id,
        userName: data.user.userName || data.user.UserName,
        email: data.user.email || data.user.Email,
        role: data.user.role || data.user.Role
      };

      setToken(data.token);
      setUser(normalizedUser);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      startLogoutTimer(data.token);

      return true;
    } catch (err) {
      console.error('Login error:', err.message);
      return false;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        startLogoutTimer(storedToken);
      } catch (err) {
        console.error('Failed to parse session:', err);
        logout();
      }
    }
  }, [startLogoutTimer]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
