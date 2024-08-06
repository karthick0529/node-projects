import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const URLDetails = () => {
  const { shortURL } = useParams();
  const [urlData, setUrlData] = useState(null);

  useEffect(() => {
    const fetchURLDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/url/redirect/${shortURL}`, { headers: { Authorization: `Bearer ${token}` } });
        setUrlData(response.data);
      } catch (error) {
        alert('Error fetching URL details');
      }
    };

    fetchURLDetails();
  }, [shortURL]);

  if (!urlData) return <Container>Loading...</Container>;

  return (
    <Container>
      <Typography variant="h4">URL Details</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Long URL:</Typography>
        <Typography>{urlData.longURL}</Typography>
        <Typography variant="h6">Click Count:</Typography>
        <Typography>{urlData.clickCount}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => window.open(urlData.longURL, '_blank')}
        >
          Visit Long URL
        </Button>
      </Box>
    </Container>
  );
};

export default URLDetails;
