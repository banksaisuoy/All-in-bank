import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Invalid stored user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    // Mock login logic
    if (email && password) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = { id: 1, email, name: email.split('@')[0] };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return true;
    }
    throw new Error('Invalid credentials');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const refreshToken = useCallback(async () => {
    // Mock token refresh
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localStorage.getItem('token')) {
          const newToken = 'mock-jwt-token-refreshed-' + Date.now();
          localStorage.setItem('token', newToken);
          resolve(newToken);
        } else {
          logout();
          reject(new Error('No token to refresh'));
        }
      }, 500);
    });
  }, [logout]);

  const value = {
    user,
    login,
    logout,
    refreshToken,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};