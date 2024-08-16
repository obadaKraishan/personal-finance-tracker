import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import AddEventForm from './components/AddEventForm';
import Navbar from './components/Navbar';
import Tickets from './pages/Tickets';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
}

function AuthRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/events/:id" element={user ? <EventDetails /> : <Navigate to="/login" />} />
      <Route path="/my-tickets" element={user ? <Tickets /> : <Navigate to="/login" />} />
      <Route path="/add-event" element={user && (user.role === 'Organizer' || user.role === 'Admin') ? <AddEventForm /> : <Navigate to="/" />} />
      <Route path="/dashboard" element={user && user.role === 'Admin' ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
