import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { TransferForm } from './components/TransferForm';
import { TransferSuccess } from './components/TransferSuccess';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';
import { Navbar } from './components/Navbar';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    {children}
  </div>
);

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
        <Route path="/transfer" element={<PrivateRoute><MainLayout><TransferForm /></MainLayout></PrivateRoute>} />
        <Route path="/transfer-success" element={<PrivateRoute><MainLayout><TransferSuccess /></MainLayout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><MainLayout><Settings /></MainLayout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MainLayout><Profile /></MainLayout></PrivateRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
