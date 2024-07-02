// src/components/UserList/UserList.tsx

import React from 'react';
import { User } from '../../contexts/AuthContext';
import { Button, Typography, Container } from '@mui/material';

interface UserListProps {
  users: User[];
  handleEdit: (id: string) => void;  // Ensure correct ID type
  handleDelete: (id: string) => void;  // Ensure correct ID type
}

const UserList: React.FC<UserListProps> = ({ users, handleEdit, handleDelete }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>User List</Typography>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Typography variant="body1">{user.name} - {user.email}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(user.id)}  // Pass string ID
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(user.id)}  // Pass string ID
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default UserList;
