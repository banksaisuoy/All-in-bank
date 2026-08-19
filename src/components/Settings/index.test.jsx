    vi.clearAllMocks();
  });

  it('should render settings error', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();