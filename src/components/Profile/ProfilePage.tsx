// src/components/Profile/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth, User } from '../../contexts/AuthContext';
import { Typography, TextField, Button, Container } from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfile, setProfile, loading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getProfile(id || '');
      setUser(profile);
      setEditableUser(profile);
    };
    fetchUser();
  }, [id, getProfile]);

  const handleSave = async () => {
    if (editableUser) {
      await setProfile(editableUser);
      setUser(editableUser);
    }
  };

  if (loading || !user || !editableUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Profile Details</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Name"
          value={editableUser.name}
          onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email"
          value={editableUser.email}
          onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Phone Number"
          value={editableUser.phoneNumber}
          onChange={(e) => setEditableUser({ ...editableUser, phoneNumber: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      </form>
    </Container>
  );
};

export default ProfilePage;
