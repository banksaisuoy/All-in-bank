
vi.mock('../../services/ProfileAPI', () => ({
  updateSettings: vi.fn(),
  getUserProfile: vi.fn(),
}));

const mockSettings = { notifications: true, darkMode: false };
    vi.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    ProfileAPI.getUserProfile.mockRejectedValue(new Error('error'));
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });
});