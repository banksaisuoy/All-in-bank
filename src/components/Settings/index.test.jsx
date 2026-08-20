import { render, screen, waitFor } from '@testing-library/react';
import { Settings } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';
import { AuthContext } from '../../auth/AuthProvider';

vi.mock('../../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateSettings: vi.fn(),
}));

const mockUser = { id: 1, email: 'test@example.com' };
const renderWithAuth = (ui) => {
  return render(
    <AuthContext.Provider value={{ user: mockUser }}>
      {ui}
    </AuthContext.Provider>
  );
};

describe('Settings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    ProfileAPI.getUserProfile.mockResolvedValue({
      settings: { notifications: true }
    });
    
    renderWithAuth(<Settings />);
    
    await waitFor(() => {
      expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    ProfileAPI.getUserProfile.mockRejectedValue(new Error('Failed to fetch'));
    
    renderWithAuth(<Settings />);
    
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });