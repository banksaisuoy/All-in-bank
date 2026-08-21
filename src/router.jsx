import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
