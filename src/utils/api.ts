// src/utils/api.ts

import localforage from 'localforage';
import { User } from '../contexts/AuthContext';

export const getUsers = async (): Promise<User[]> => {
  return (await localforage.getItem<User[]>('users')) || [];
};

export const getUser = async (id: string): Promise<User | undefined> => {
  const users = await getUsers();
  return users.find(user => user.id === id);
};

export const saveUser = async (user: User) => {
  const users = await getUsers();
  const updatedUsers = users.map(u => (u.id === user.id ? user : u));
  await localforage.setItem('users', updatedUsers);
};

export const deleteUser = async (id: string) => {
  const users = await getUsers();
  const updatedUsers = users.filter(user => user.id !== id);
  await localforage.setItem('users', updatedUsers);
};
