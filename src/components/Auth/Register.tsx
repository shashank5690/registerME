import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRegister from '../../hooks/useRegister';

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

const Register = () => {
  const { registerUser, loading } = useRegister();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    defaultValues: { name: '', email: '', phoneNumber: '', password: '', roleType: 'user' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data);
      window.location.href = `/profile/${Date.now()}`; // Redirect to the profile page with a new id
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <TextField {...field} label="Phone Number" fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />}
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
              {errors.roleType && <p>{errors.roleType.message}</p>}
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Container>
  );
};

export default Register;
