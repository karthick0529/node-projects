import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const CreateURL = () => {
  const [longURL, setLongURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/url/create', { longURL }, { headers: { Authorization: `Bearer ${token}` } });
      alert('URL shortened successfully!');
    } catch (error) {
      alert('Error creating shortened URL');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create Short URL</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Long URL"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateURL;
