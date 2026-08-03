import React from 'react';
import { AppRouter } from './router';
import { AuthProvider } from './auth/AuthProvider';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;