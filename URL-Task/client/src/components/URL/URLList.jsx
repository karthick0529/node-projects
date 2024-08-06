import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const URLList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/url/get', { headers: { Authorization: `Bearer ${token}` } });
        setUrls(response.data.userURLs);
      } catch (error) {
        alert('Error fetching URLs');
      }
    };
    fetchURLs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/url/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUrls(urls.filter((url) => url._id !== id));
      alert('URL deleted successfully');
    } catch (error) {
      alert('Error deleting URL');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Your Short URLs</Typography>
      <List>
        {urls.map((url) => (
          <ListItem key={url._id}>
            <ListItemText primary={`Short URL: ${url.shortURL}`} secondary={`Long URL: ${url.longURL}`} />
            <Button variant="contained" color="secondary" onClick={() => handleDelete(url._id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default URLList;
