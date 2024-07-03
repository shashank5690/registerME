// src/components/UserList/UserList.tsx

import React from 'react';
import { User } from '../../contexts/AuthContext';
import { Container, Typography, Button, Box, List, ListItem } from '@mui/material';

interface UserListProps {
  users: User[];
  handleEdit: (id: string) => void;  // Ensure correct ID type
  handleDelete: (id: string) => void;  // Ensure correct ID type
}

const UserList: React.FC<UserListProps> = ({ users, handleEdit, handleDelete }) => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>User List</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {user.name} - {user.email}
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(user.id)}
                size="large"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(user.id)}
                size="large"
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;