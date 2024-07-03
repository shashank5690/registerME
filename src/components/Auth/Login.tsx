// src/components/Auth/Login.tsx

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress, Box } from '@mui/material';
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-12 w-full max-w-xl">
        <Typography
          variant="h4"
          gutterBottom
        >
          <div className="text-center text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto' }}>
            Login Form <span className="text-black">🚀</span>
          </div>

        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="mb-4"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '0.75rem', // rounded corners
                      borderColor: 'gray.600', // dark gray border
                    },
                    '& .MuiInputLabel-root': {
                      color: 'gray.700', // dark gray label
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray.700', // dark gray text
                      '&::placeholder': {
                        color: 'gray.500', // dark gray placeholder
                      },
                    },
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  className="mb-4"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '0.75rem', // rounded corners
                      borderColor: 'gray.600', // dark gray border
                    },
                    '& .MuiInputLabel-root': {
                      color: 'gray.700', // dark gray label
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray.700', // dark gray text
                      '&::placeholder': {
                        color: 'gray.500', // dark gray placeholder
                      },
                    },
                  }}
                />
              )}
            />
            <Controller
              name="roleType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.roleType} className="mb-4">
                  <InputLabel className="text-gray-700">Role</InputLabel>
                  <Select
                    {...field}
                    label="Role"
                    className="rounded-lg border-gray-600 text-gray-700"
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: '1rem', // rounded corners
                        borderColor: 'gray.600', // dark gray border
                      },
                      '& .MuiInputLabel-root': {
                        color: 'gray.700', // dark gray label
                      },
                      '& .MuiInputBase-input': {
                        color: 'gray.700', // dark gray text
                        '&::placeholder': {
                          color: 'gray.500', // dark gray placeholder
                        },
                      },
                    }}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  {errors.roleType && <p className="text-red-600">{errors.roleType.message}</p>}
                </FormControl>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color='success'
              fullWidth
              disabled={loading}
              sx={{
                mt: 4, // margin-top
                bgcolor: '#000000', // background color
                '&:hover': {
                  bgcolor: '#184ab8', // background color on hover
                },
                color: 'white', // text color
                py: 1.5, // padding-y
                px: 3.5, // padding-x
                borderRadius: '1rem', // rounded corners
                fontSize: '1.125rem', // text size
                fontWeight: 600, // bold text
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;