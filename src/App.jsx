import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ProfileCard } from './components/ProfileCard';
import { AccountSettings } from './components/AccountSettings';
import { useProfile } from './hooks/useProfile';
import { Navbar } from './components/Navbar';
import './index.css';

const ProfilePage = () => {
  const { profile, settings, updateSettings, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-600 flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            Loading profile...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ProfileCard profile={profile} />
          <AccountSettings settings={settings} onUpdate={updateSettings} />
        </div>
      </main>
    </div>
  );
};

// Placeholder for the transaction details page
const TransactionDetails = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>