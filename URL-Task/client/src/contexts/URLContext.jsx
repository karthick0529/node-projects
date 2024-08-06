import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const URLContext = createContext();

export const URLProvider = ({ children }) => {
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

  const createURL = async (longURL) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/url/create', { longURL }, { headers: { Authorization: `Bearer ${token}` } });
      setUrls([...urls, response.data.new_URL]);
    } catch (error) {
      alert('Error creating URL');
    }
  };

  const deleteURL = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/url/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      alert('Error deleting URL');
    }
  };

  return (
    <URLContext.Provider value={{ urls, createURL, deleteURL }}>
      {children}
    </URLContext.Provider>
  );
};

export default URLContext;
