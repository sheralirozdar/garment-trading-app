import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    preferredActivationMethod: 'abc@gmail.email', 
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const  generateOTP=() =>{

}
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', formData);
      const { activationToken } = response.data;

      if (formData.preferredActivationMethod === 'email') {
        await axios.post('/api/send-activation-email', {
          email: formData.email,
          activationToken,
        });
      } else if (formData.preferredActivationMethod === 'otp') {
        await axios.post('/api/send-otp', {
          email: formData.email,
          otp: generateOTP(), 
        });
      }

      redirect("./activate")
    } catch (error) {
      setErrorMessage('Error registering user');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Register</h2>
    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-1">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
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
      <div className="mb-4">
        <label htmlFor="preferredActivationMethod" className="block mb-1">
          Preferred Activation Method:
        </label>
        <select
          id="preferredActivationMethod"
          name="preferredActivationMethod"
          value={formData.preferredActivationMethod}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="email">Email</option>
          <option value="otp">OTP</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  </div>
  );
};

export default Register;

