// src/hooks/useRegister.ts

import { useState } from 'react';
import localforage from 'localforage';
import { User } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleType: 'user' | 'admin';
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    try {
      const users = (await localforage.getItem<User[]>('users')) || [];
      const admin = users.find(user => user.roleType === 'admin');

      // Check if there is already one admin
      if (data.roleType === 'admin' && admin) {
        toast.error('An admin already exists.');
        throw new Error('An admin already exists.');
      }

      // Check if the user limit is reached
      if (data.roleType === 'user' && users.length >= 5) {
        toast.error('User limit reached.');
        throw new Error('User limit reached.');
      }

      // Generate a unique ID for the new user
      const newUser: User = {
        id: Date.now().toString(),  
        ...data,
      };

      users.push(newUser);
      await localforage.setItem('users', users);
      toast.success('Registration successful!');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
  };
};

export default useRegister;
