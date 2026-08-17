import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to All-in-bank</h1>
      <p className="text-gray-600 mb-8 max-w-md text-center">Manage your finances effortlessly with our new interactive spending dashboard.</p>
      <Link to="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
        Go to Dashboard
      </Link>
    </div>
  );
}

// Layout wrapper for routes that need the navbar
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <MainLayout>
      </Routes>
    </BrowserRouter>
  );
};
