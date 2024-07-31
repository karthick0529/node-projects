import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, { password });
      alert('Password has been reset.');
    } catch (err) {
      alert('Error resetting password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>New Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
