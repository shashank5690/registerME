// src/components/Common/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management App
        </Typography>
        {user && user.roleType === 'admin' && (
          <Button color="inherit" component={Link} to="/user-list">
            User List
          </Button>
        )}
        {user && (
          <Button color="inherit" component={Link} to={`/profile/${user.id}`}>
            Profile
          </Button>
        )}
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
