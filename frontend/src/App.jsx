import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NavbarLayout from './layout/NavbarLayout';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import BookSlots from "./pages/BookSlots";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/book-slots" element={<ProtectedRoute allowedRoles={["customer"]}><BookSlots />
          </ProtectedRoute>}/>

          <Route path="/my-bookings" element={<ProtectedRoute allowedRoles={["customer"]}><MyBookings />
          </ProtectedRoute>}/>

          {/* <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard />
          </ProtectedRoute>}/> */}

          {/* Future pages like /book-slots, /search will also go inside this */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
