

import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });

      const authToken = response.data.token;

      localStorage.setItem('authToken', authToken);

 
      redirect('/dashboard')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.blocked) {
        setError('Your account is temporarily blocked. Please follow the account recovery instructions.');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email/Username:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
