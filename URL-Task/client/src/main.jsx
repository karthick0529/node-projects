import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { URLProvider } from './contexts/URLContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <URLProvider>
        <App />
      </URLProvider>
    </AuthProvider>
  </React.StrictMode>
);
