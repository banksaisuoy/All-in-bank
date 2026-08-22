import { Settings } from './components/Settings';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from './auth/PrivateRoute';
import { Login } from './auth/Login';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
  </div>
);

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        } 
      />
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
    </Routes>
  </BrowserRouter>
);
