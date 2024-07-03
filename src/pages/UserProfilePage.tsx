import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { ProfileData } from '../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  roleType: yup.mixed<'user' | 'admin'>().oneOf(['user', 'admin']).required('Role Type is required'),
  password: yup.string().required('Password is required')
}).required();

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProfile, setProfile, user, isAuthenticated } = useAuth();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProfileData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        toast.error('User ID is not provided.');
        navigate('/login');
        return;
      }

      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      if (user?.id !== id) {
        toast.error('You are not authorized to view this profile.');
        navigate('/login');
        return;
      }

      const profile = await getProfile(id);
      if (profile) {
        setValue('name', profile.name);
        setValue('phoneNumber', profile.phoneNumber);
        setValue('email', profile.email);
        setValue('roleType', profile.roleType);
        setValue('password', profile.password);
      } else {
        toast.error('User not found.');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [id, isAuthenticated, user,navigate]);

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    if (id) {
      const updatedUser = {
        id,
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        roleType: data.roleType,
        password: data.password,
      };
      await setProfile(updatedUser);
      toast.success('Profile updated successfully!');
      navigate(`/profile/${id}`); // Navigate to the updated profile page
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Profile Details</Typography>
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        {/* <Controller
          name="roleType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Role Type"
              fullWidth
              margin="normal"
              error={!!errors.roleType}
              helperText={errors.roleType?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        /> */}
        {/* <Controller
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
              InputLabelProps={{ shrink: true }}
            />
          )}
        /> */}
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </form>
    </Container>
  );
};

export default UserProfilePage;
