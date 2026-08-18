import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
  </div>
);

const Home = () => (
  <div>
    <h1>Welcome to All-in-bank</h1>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      </Routes>
    </BrowserRouter>
  );
};
