// src/components/Auth/Login.tsx

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { User, useAuth } from '../../contexts/AuthContext';
import { LoginData } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import { toast } from 'react-toastify';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  roleType: yup.mixed<'user' | 'admin'>().oneOf(['user', 'admin'], 'Role is required').required('Role is required')
}).required();

const Login = () => {
  const { login, loading } = useAuth();  // Get login function and loading state from AuthContext
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    defaultValues: { email: '', password: '', roleType: 'user' },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      // Call login function from AuthContext and await result
      await login(data.email, data.password, data.roleType);
      
      // Navigate based on roleType after successful login
      if (data.roleType === 'admin') {
        navigate('/user-list');
      } else {
        // Fetch currentUser and navigate to the profile page
        localforage.getItem<User>('currentUser').then(user => {
          if (user) {
            navigate(`/profile/${user.id}`);
          } else {
            toast.error('User profile not found.');  // Added error message if user is not found
          }
        }).catch(error => {
          toast.error('Error fetching user profile.');  // Added error message for fetch error
        });
      }
    } catch (error) {
      // Error handling is managed in the useAuth login function
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />}
        />
        <Controller
          name="roleType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.roleType}>
              <InputLabel>Role</InputLabel>
              <Select {...field} label="Role">
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {errors.roleType && <Typography color="error">{errors.roleType.message}</Typography>}
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}  {/* Added CircularProgress spinner for loading state */}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
