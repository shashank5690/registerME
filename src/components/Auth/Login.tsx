// src/components/Auth/Login.tsx

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { User, useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage'; // Import localforage here

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  roleType: yup.mixed<'user' | 'admin'>().oneOf(['user', 'admin'], 'Role is required').required('Role is required')
}).required();

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    defaultValues: { email: '', password: '', roleType: 'user' },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await login(data.email, data.password, data.roleType);
      toast.success('Logged in successfully!');
      setTimeout(() => {
        if (data.roleType === 'admin') {
          navigate('/user-list');
        } else {
          // Assuming you want to navigate to the profile of the logged-in user
          localforage.getItem<User>('currentUser').then(user => {
            if (user) {
              navigate(`/profile/${user.id}`);
            } else {
              toast.error('User profile not found.');
            }
          }).catch(error => {
            toast.error('Error fetching user profile.');
          });
        }
      }, 2000);
    } catch (error) {
      toast.error('Login failed.');
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select {...field} label="Role" error={!!errors.roleType}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {errors.roleType && <Typography color="error">{errors.roleType.message}</Typography>}
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
