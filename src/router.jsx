import { Navbar } from './components/Navbar';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';
import { TransferForm } from './components/TransferForm';
import { TransferSuccess } from './components/TransferSuccess';

// Layout wrapper for routes that need the navbar
const MainLayout = ({ children }) => (
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transfer" 
          element={
            <PrivateRoute>
              <MainLayout>
                <TransferForm />
              </MainLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transfer/success" 
          element={
            <PrivateRoute>
              <MainLayout>
                <TransferSuccess />
              </MainLayout>
            </PrivateRoute>
          } 
        />
        {/* Placeholder for the transaction details page to avoid breaking tests/existing routing */}
        <Route path="/transactions/:id" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
