import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
  </div>
);

// Home component for the root path
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to All-in-bank</h1>
      <p className="text-gray-500 mb-8">Manage your finances in one place</p>
      <a href="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Go to Login
      </a>
    </div>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <MainLayout>
      </Routes>
    </BrowserRouter>
  );
};
