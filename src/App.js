import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from './pages/welcome/Welcome';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import ResetPassword from './pages/auth/resetPassword/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword';
import CheckEmail from './pages/auth/checkEmail/CheckEmail';
import OfferDetails from './pages/offerDetails/OfferDetails';
import AddEditOffer from './pages/addOffer/AddEditOffer';
import ConfirmPage from './pages/auth/confirm/ConfirmPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirmation" element={<ConfirmPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/offer-details" element={<OfferDetails />} />
        <Route path="/add-offer" element={<AddEditOffer />} />
      </Routes>
    </div>
  );
}

export default App;
