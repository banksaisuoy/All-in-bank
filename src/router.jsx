import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Navbar } from './components/Navbar';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="flex-1 p-4 sm:p-8">
      {children}
    </main>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route 
          path="/profile" 
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};
