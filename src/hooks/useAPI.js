// src/hooks/useAPI.js
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = useCallback(async (apiCall, successMessage = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    callAPI,
    resetError
  };
};

export default useAPI;