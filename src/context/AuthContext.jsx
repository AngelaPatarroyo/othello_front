import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const extractRole = (decoded) => {
    const knownKeys = ['role', 'roles', 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const roleKey = Object.keys(decoded).find((k) =>
      knownKeys.includes(k.toLowerCase()) || k.toLowerCase().includes('role')
    );
    if (!roleKey) return null;
    const val = decoded[roleKey];
    return Array.isArray(val) ? val[0] : val;
  };

  const extractUserId = (decoded) => {
    return decoded.nameid || decoded.sub || null;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const role = extractRole(decoded);
        const userId = extractUserId(decoded);
        console.log('Decoded token:', decoded);
        console.log('Extracted role:', role);

        setToken(storedToken);
        setUser({ ...decoded, role, id: userId });
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
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
      const decoded = jwtDecode(data.token);
      const role = extractRole(decoded);
      const userId = extractUserId(decoded);
      const normalizedUser = { ...decoded, role, id: userId };

      setToken(data.token);
      setUser(normalizedUser);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      return true;
    } catch (err) {
      console.error('Login error:', err.message);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
