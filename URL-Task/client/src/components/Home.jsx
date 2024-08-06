// src/components/Home.js
import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Typography variant="h2">Welcome to URL Shortener</Typography>
      <Link to="/create-url">
        <Button variant="contained">Create URL</Button>
      </Link>
      <Link to="/urls">
        <Button variant="contained">View URLs</Button>
      </Link>
    </div>
  );
};

export default Home;
