import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { URLProvider } from './contexts/URLContext';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <URLProvider>
        <App />
      </URLProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
