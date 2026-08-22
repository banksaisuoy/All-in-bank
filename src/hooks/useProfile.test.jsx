
vi.mock('../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
}));

describe('useProfile', () => {
  it('should handle loading state and fetch data', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User', settings: { notifications: true } });
    
    expect(result.current.profile).toEqual({ name: 'Test User', settings: { notifications: true } });
    expect(result.current.settings).toEqual({ notifications: true });
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));