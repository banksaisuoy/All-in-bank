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
                <div className="py-8 px-4 sm:px-6 lg:px-8"><TransferForm /></div>
              </MainLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transfer/success" 
          element={
            <PrivateRoute>
              <MainLayout>
                <div className="py-8 px-4 sm:px-6 lg:px-8"><TransferSuccess /></div>
              </MainLayout>
            </PrivateRoute>
          } 
        />
        {/* Placeholder for the transaction details page to avoid breaking tests/existing routing */}
        <Route path="/transactions/:id" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>