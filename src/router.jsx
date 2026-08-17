import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to All-in-bank</h1>
      <Link to="/dashboard" className="text-blue-500 hover:underline">Go to Dashboard</Link>
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
