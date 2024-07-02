// src/components/Profile/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth, User } from '../../contexts/AuthContext';
import { Typography, TextField, Button, Container, CircularProgress, Box } from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfile, setProfile, loading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getProfile(id || '');
      setUser(profile);
      setEditableUser(profile);
    };
    fetchUser();
  }, [id, getProfile]);

  const handleSave = async () => {
    setSaving(true);
    if (editableUser) {
      await setProfile(editableUser);
      setUser(editableUser);
    }
    setSaving(false);
  };

  if (loading || !user || !editableUser) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // if (loading) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

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
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ProfilePage;
