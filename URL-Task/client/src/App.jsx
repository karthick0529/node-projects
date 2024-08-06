import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreateURL from './components/URL/CreateURL';
import URLList from './components/URL/URLList';

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-url" element={<CreateURL />} />
          <Route path="/urls" element={<URLList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
