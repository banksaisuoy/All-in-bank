import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Navbar } from './components/Navbar';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';

// Layout wrapper for routes that need the navbar
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    {children}
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </PrivateRoute>
          } 
        />
        />
        {/* Placeholder for the transaction details page to avoid breaking tests/existing routing */}
        <Route path="/transactions/:id" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};