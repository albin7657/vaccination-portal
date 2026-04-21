import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from "./pages/UserDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import UserAppointments from './pages/UserAppointment';
import UserBooking from './pages/UserBooking';
import HospitalAvailability from './pages/HospitalAvailability';
import HospitalAppointments from './pages/HospitalAppointments';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/dashboard" element={<UserDashboard />} >
          <Route index element={<Navigate to="appointments" replace />} />
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="book" element={<UserBooking />} />
        </Route>
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} >
          <Route index element={<Navigate to="appointments" replace />} />
          <Route path="availability" element={<HospitalAvailability />} />
          <Route path="appointments" element={<HospitalAppointments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;