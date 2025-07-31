import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NavbarLayout from './layout/NavbarLayout';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import BookSlots from "./pages/BookSlots";
import MyBookings from "./pages/MyBookings";
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './utils/axiosInstance';
import { setAuthChecked, setLoading, setUser } from './store/userSlice';
import AdminLayout from './layout/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import CreateSlotPage from './pages/admin/CreateSlotPage';
import MySlotsPage from './pages/admin/MySlotsPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import GlobalLoader from './pages/GlobalLoader';
import { toast } from 'sonner';
import BarberProfile from './pages/admin/BarberProfile';

const App = () => {
  const { user, isloading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchUserFromCookie = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get("/api/auth/me");
      dispatch(setUser({
        user: res.data.user,
        role: res.data.user.role,
      }));
    } catch (err) {
      console.log("Not logged in", err.response?.data?.message);
      dispatch(setAuthChecked()); // ✅ mark check complete even on error
    }
  };

  fetchUserFromCookie();
}, []);


  if (isloading) {
  return <GlobalLoader />; // Optional global loader
}

  return (
    <BrowserRouter>
     {isloading ? (
      <GlobalLoader /> // Show this globally before routes load
    ) : (
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/book-slots" element={<ProtectedRoute user={user}  allowedRoles={["customer"]}><BookSlots />
          </ProtectedRoute>}/>

          <Route path="/my-bookings" element={<ProtectedRoute user={user} allowedRoles={["customer"]}><MyBookings />
          </ProtectedRoute>}/>

        </Route>

        <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} />}>
            <Route path="/dashboard" element={<AdminLayout /> }>
              <Route index element={<DashboardPage />} />

              <Route path="create-slot" element={<CreateSlotPage />} />
              <Route path="slots" element={<MySlotsPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="barber-profile" element={<BarberProfile />} />
            </Route>
        </Route>

          {/* Future pages like /book-slots, /search will also go inside this */}
        
      </Routes>
    )}
    </BrowserRouter>

  // <BrowserRouter>
  //   {isloading ? (
  //     <GlobalLoader /> // Show this globally before routes load
  //   ) : (
  //     <Routes>
  //       <Route element={<NavbarLayout />}>
  //         <Route path="/" element={<LandingPage />} />
  //         <Route path="/login" element={<LoginPage />} />
  //         <Route path="/register" element={<RegisterPage />} />
  //         <Route path="/book-slots" element={
  //           <ProtectedRoute allowedRoles={["customer"]}>
  //             <BookSlots />
  //           </ProtectedRoute>
  //         } />
  //         <Route path="/my-bookings" element={
  //           <ProtectedRoute allowedRoles={["customer"]}>
  //             <MyBookings />
  //           </ProtectedRoute>
  //         } />
  //       </Route>

  //       <Route element={
  //         <ProtectedRoute allowedRoles={["admin"]}>
  //           <AdminLayout />
  //         </ProtectedRoute>
  //       }>
  //         <Route path="/dashboard" element={<DashboardPage />} />
  //         <Route path="/dashboard/create-slot" element={<CreateSlotPage />} />
  //         <Route path="/dashboard/slots" element={<MySlotsPage />} />
  //         <Route path="/dashboard/bookings" element={<AdminBookingsPage />} />
  //       </Route>
  //     </Routes>
  //   )}
  // </BrowserRouter>

  );
};

export default App;
