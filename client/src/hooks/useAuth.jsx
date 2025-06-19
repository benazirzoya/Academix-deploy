import { useState, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';  
import { AuthContext } from '../components/AuthContext';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const { user, setUser, hydrated } = useContext(AuthContext);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError(''); 

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.success) {
        const { token, user: userInfo } = response.data;

        const loggedInUser = {
          email: userInfo.email,
          role: userInfo.role,
          token,
          _id: userInfo._id,
        };

        setUser(loggedInUser);
        localStorage.setItem('academix_user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);

        toast.success('Login successful!');
        return { success: true, message: 'Login successful!' };
      } else {
        const errorMessage = response.data.message || 'Login failed.';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed.';
      console.error('Login Error:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('academix_user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
  };

  const isAuthenticated = !!user;

  if (!hydrated) {
    return { loading: true, isAuthenticated: false };
  }

  return { user, login, logout, loading, error, isAuthenticated };
};
