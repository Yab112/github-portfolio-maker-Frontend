import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/protectedRoutes/ProtectedRoute';
import { PublicLandingPage, Login, Signup, VerifyOtp, Dashboard,ResetPassword } from './pages';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
    
  );
}

export default App;
