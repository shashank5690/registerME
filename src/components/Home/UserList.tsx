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
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">

      <Typography
          variant="h4"
          gutterBottom
        >
          <div className="text-center text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto' }}>
            Register Form <span className="text-black">🚀</span>
          </div>

        </Typography>
        <Box sx={{ maxHeight: '500px', overflow: 'auto', padding: 2, backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2, padding: 2, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
              {user.name} - {user.email}
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#4caf50', // green color
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '0.5rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: '#45a049', // darker green on hover
                  },
                }}
                onClick={() => handleEdit(user.id)}
                size="large"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f44336', // red color
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '0.5rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: '#d32f2f', // darker red on hover
                  },
                }}
                onClick={() => handleDelete(user.id)}
                size="large"
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
      </div>
     </div> 
    </Container>
  );
};

export default UserList;