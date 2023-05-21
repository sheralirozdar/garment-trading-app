import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', formData);
      const { token } = response.data;

      localStorage.setItem('token', token);

      const activeSessionResponse = await axios.get('/api/user/active-session');
      const { activeSession } = activeSessionResponse.data;

      if (activeSession) {
        setErrorMessage('You are already logged in from another device.');
        return;
      }

      await axios.put('/api/user/activate-session', { session: token });

      redirect('/dashbaord')
    } catch (error) {
      setErrorMessage('Invalid email or password.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
