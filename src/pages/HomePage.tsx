// src/pages/HomePage.tsx

import React, { useEffect, useState } from 'react';
import UserList from '../components/Home/UserList';
import { User, useAuth } from '../contexts/AuthContext';
import { getUsers } from '../utils/api';  // Import the correct function
import localforage from 'localforage';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (error) {
        toast.error('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    window.location.href = `/profile/${id}`;
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      await localforage.setItem('users', updatedUsers);
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete user.');
    }
  };

  if (user?.roleType !== 'admin') {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div>
      <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
