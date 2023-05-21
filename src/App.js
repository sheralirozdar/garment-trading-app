import "./main.css"
import React from 'react';
import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UserDashboard from './components/UserDashboard';
import Register from './components/Register.';
import AdminDashboard from './components/AdminDashboard';
import Messaging from "./components/InAppMessaging";
import EKYC from './components/facereco'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route  path="/" element={<Register />} />

          <Route  path="/login" element={<Login />} />
          <Route  path="/forgot-password" element={<ForgotPassword />} />
          <Route  path="/dashboard" element={<UserDashboard />} /> 
          <Route  path="/admin" element={<AdminDashboard />} /> 
          <Route  path="/message" element={<Messaging />} /> 
          <Route  path="/face" element={<EKYC />} /> 
          <Route  path="/register" element={<Register />} /> 





        </Routes>
      </div>
    </Router>
  );
};

export default App;
