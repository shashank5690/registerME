// src/components/Profile/ProfilePage.tsx

import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Typography, TextField, Button, Container } from '@mui/material';

interface ProfilePageProps {
  id: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ id }) => {
  const { user, loading, handleSave, handleDelete } = useForm(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      handleSave(user);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Profile Details</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={user.name}
          onChange={(e) => (user.name = e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={user.email}
          onChange={(e) => (user.email = e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone Number"
          value={user.phoneNumber}
          onChange={(e) => (user.phoneNumber = e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">Delete</Button>
      </form>
    </Container>
  );
};

export default ProfilePage;
