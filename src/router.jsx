import { Settings } from './components/Settings';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';
import { Navbar } from './components/Navbar';

function Home() {
  return (
// Layout wrapper for routes that need the navbar
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
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
