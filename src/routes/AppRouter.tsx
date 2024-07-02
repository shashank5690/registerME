// src/routes/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserProfilePage from '../pages/UserProfilePage';
import HomePage from '../pages/HomePage';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Common/Navbar';
import Loader from '../components/Common/Loader';

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:id" element={<UserProfilePage />} />
            <Route path="/user-list" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </React.Suspense>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
