import React, { createContext, useState, useCallback, useEffect } from 'react';
import AuthService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (email, password, fullName) => {
    try {
      setError(null);
      const result = await AuthService.register({
        email,
        password,
        fullName,
        role: 'CONSUMER'
      });
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Registration failed');
      throw err;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      const result = await AuthService.login(email, password);
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
