import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('quickportfolio_user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Verify token with backend
          try {
            await authAPI.getMe();
          } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('quickportfolio_user');
            localStorage.removeItem('latestPortfolio'); // Clear portfolio data
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to parse user:', error);
          localStorage.removeItem('quickportfolio_user');
          localStorage.removeItem('latestPortfolio');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const userData = response.data.data || response.data;
      
      // Clear old data before setting new user
      localStorage.removeItem('latestPortfolio');
      
      // Save token and user data
      authAPI.setAuthData(userData);
      setUser(userData);
      
      return { success: true, data: userData };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const userDataResponse = response.data.data || response.data;
      
      // Clear old data
      localStorage.removeItem('latestPortfolio');
      
      // Save token and user data
      authAPI.setAuthData(userDataResponse);
      setUser(userDataResponse);
      
      return { success: true, data: userDataResponse };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    // Clear all user-related data
    localStorage.removeItem('quickportfolio_user');
    localStorage.removeItem('latestPortfolio');
    authAPI.logout();
    setUser(null);
    window.location.href = '/login';
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    authAPI.setAuthData(updatedUser);
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};