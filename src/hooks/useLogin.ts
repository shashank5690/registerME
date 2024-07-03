
import { useState } from 'react';
import { User } from '../contexts/AuthContext';
import localforage from 'localforage';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, roleType: 'user' | 'admin') => {
    setLoading(true);
    try {
      const users = await localforage.getItem<User[]>('users') || [];
      const user = users.find(user => user.email === email && user.password === password && user.roleType === roleType);

      if (user) {
        // Save the logged-in user to localforage
        await localforage.setItem('currentUser', user);

        // Navigate based on roleType
        if (roleType === 'admin') {
          // Navigate to the user list page for admin
          return { redirectTo: '/user-list' };
        } else {
          // Navigate to the profile of the logged-in user
          return { redirectTo: `/profile/${user.id}` };
        }
      } else {
        toast.error('Invalid credentials.');
        throw new Error('Invalid credentials.');
      }
    } catch (error) {
      toast.error((error as Error).message);
      return { redirectTo: '/login' };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};
