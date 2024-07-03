// src/hooks/useForm.ts

import { useState, useEffect } from 'react';
import { User, useAuth } from '../contexts/AuthContext';
import { getUser, saveUser, deleteUser } from '../utils/api';

export const useForm = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const { user: authUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUser(id);  // Ensure id is a string
        setUser(fetchedUser || null);  // Set to null if user is undefined
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSave = async (user: User) => {
    try {
      await saveUser(user);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        await deleteUser(user.id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return { user, loading, handleSave, handleDelete };
};
