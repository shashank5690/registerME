// src/hooks/useLogin.ts

import { useState } from 'react';
import { User } from '../contexts/AuthContext';
import localforage from 'localforage';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data: { email: string; password: string; roleType: 'user' | 'admin' }) => {
    setLoading(true);
    try {
      const users = await localforage.getItem<User[]>('users') || [];
      const user = users.find(user => user.email === data.email && user.password === data.password && user.roleType === data.roleType);

      if (user) {
        toast.success('Login successful!');
      
      } else {
        toast.error('Invalid credentials.');
        throw new Error('Invalid credentials.');
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};
