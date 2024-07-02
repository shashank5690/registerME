// src/contexts/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import localforage from 'localforage';
import { toast } from 'react-toastify';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  roleType: 'user' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, roleType: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  getProfile: (id: string) => Promise<User | null>;
  setProfile: (user: User) => Promise<void>;
  loading: boolean;  // Add loading state here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);  // Add loading state here

  const login = async (email: string, password: string, roleType: 'user' | 'admin') => {
    setLoading(true);  // Start loading
    try {
      const users = (await localforage.getItem<User[]>('users')) || [];
      const foundUser = users.find(u => u.email === email && u.password === password && u.roleType === roleType);

      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        await localforage.setItem('currentUser', foundUser);  // Store the current user
        toast.success('Logged in successfully.');
      } else {
        toast.error('Invalid email, password, or role.');
        throw new Error('Login failed.');
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localforage.removeItem('currentUser');  // Remove the current user from storage
    toast.info('Logged out.');
    window.location.href = '/login';  // Redirect to the login page
  };

  const getProfile = async (id: string) => {
    try {
      const users = (await localforage.getItem<User[]>('users')) || [];
      return users.find(user => user.id === id) || null;
    } catch (error) {
      toast.error('Error fetching user profile.');
      return null;
    }
  };

  const setProfile = async (user: User) => {
    try {
      const users = (await localforage.getItem<User[]>('users')) || [];
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        await localforage.setItem('users', users);
        await localforage.setItem('currentUser', user); // Update the current user in storage
      }
    } catch (error) {
      toast.error('Error updating user profile.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getProfile, setProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
