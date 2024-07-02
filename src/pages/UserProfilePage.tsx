// src/pages/UserProfilePage.tsx

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
}).required();

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, getProfile, setProfile } = useAuth();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProfileData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        // Handle the case where id is undefined
        toast.error('User ID is not provided.');
        navigate('/login');  // Redirect to login or any other appropriate page
        return;
      }

      const profile = await getProfile(id);
      if (profile) {
        setValue('name', profile.name);
        setValue('phoneNumber', profile.phoneNumber);
      } else {
        toast.error('User not found.');
        navigate('/login');  // Redirect to login or any other appropriate page
      }
    };

    fetchUserProfile();
  }, [id, getProfile, navigate, setValue]);

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    if (user) {
      const updatedUser = {
        ...user,
        name: data.name,
        phoneNumber: data.phoneNumber,
      };
      await setProfile(updatedUser);
      toast.success('Profile updated successfully!');
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
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </form>
    </Container>
  );
};

export default UserProfilePage;
