// src/pages/Register.tsx

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRegister from '../../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

// Define the schema for the form validation
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  roleType: yup.string().oneOf(['user', 'admin'], 'Role must be either user or admin').required('Role is required'),
}).required();

interface RegisterFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleType: 'user' | 'admin';
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser, loading } = useRegister();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    defaultValues: { name: '', email: '', phoneNumber: '', password: '', roleType: 'user' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data);
      navigate('/login');  // Redirect to login page after successful registration
    } catch (error) {
      if ((error as Error).message === 'Only one admin is allowed.') {
        navigate('/login');  // Redirect to login page when only one admin is allowed
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return  (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', padding: 0 }}>
    
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <Typography
          variant="h4"
          gutterBottom
        >
          <div className="text-center text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto' }}>
            Register Form <span className="text-black">🚀</span>
          </div>

        </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
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
                  <FormControl fullWidth margin="normal" error={!!errors.roleType}>
                    <InputLabel className="text-gray-700">Role</InputLabel>
                    <Select
                      {...field}
                      label="Role"
                      className="rounded-lg border-gray-600 text-gray-700"
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'gray.700', // dark gray text
                        },
                        '& .MuiSelect-icon': {
                          color: 'gray.700', // dark gray icon
                        },
                        '& .MuiInputLabel-root': {
                          color: 'gray.700', // dark gray label
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
                color="success"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 4, // margin-top
                  bgcolor: '#000000', // background color
                  '&:hover': {
                    bgcolor: '#184ab8', // background color on hover
                  },
                  color: 'white', // text color
                  py: 2, // padding-y
                  px: 4, // padding-x
                  borderRadius: '1rem', // rounded corners
                  fontSize: '1.125rem', // text size
                  fontWeight: 600, // bold text
                }}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Register;
