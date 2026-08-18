import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateSettings: vi.fn(),
}));

  });

  it('renders loading state initially', () => {
    ProfileAPI.getUserProfile.mockReturnValue(new Promise(() => {})); // Never resolves
    render(<Settings />);
    expect(screen.getByTestId('settings-loading')).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    ProfileAPI.getUserProfile.mockRejectedValue(new Error('Failed to load'));
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
  });

  it('renders settings and handles toggles', async () => {
    ProfileAPI.getUserProfile.mockResolvedValue(mockSettings);
    ProfileAPI.updateSettings.mockResolvedValue({ ...mockSettings, notifications: false, darkMode: true });
    
    render(<Settings />);