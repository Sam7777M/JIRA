import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Project from '../pages/Project';
import Ticket from '../pages/Ticket';
import Profile from '../pages/Profile';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/projects/:id" element={<PrivateRoute><Project /></PrivateRoute>} />
      <Route path="/tickets/:id" element={<PrivateRoute><Ticket /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default AppRoutes;
