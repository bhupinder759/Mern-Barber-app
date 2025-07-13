import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NavbarLayout from './layout/NavbarLayout';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import BookSlots from "./pages/BookSlots";
import MyBookings from "./pages/MyBookings";
import { useDispatch } from 'react-redux';
import axiosInstance from './utils/axiosInstance';
import { setLoading, setUser } from './store/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserFromCookie = async () => {
      dispatch(setLoading(true))
      try {
        const res = await axiosInstance.get("/api/auth/me");
        dispatch(
          setUser({
            user: res.data.user,
            role: res.data.user.role,
          })
        );
      } catch (err) {
        console.log("Not logged in", err.response?.data?.message);
      }
      finally {
        dispatch(setLoading(false)); //  End loading
      }

    };

    fetchUserFromCookie();
  }, []);

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
