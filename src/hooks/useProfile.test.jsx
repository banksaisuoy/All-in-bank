import * as ProfileAPI from '../services/ProfileAPI';

vi.mock('../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateProfile: vi.fn(),
  updateSettings: vi.fn(),
}));

describe('useProfile', () => {
  it('should fetch profile successfully', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User' });

    const { result } = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toEqual({ name: 'Test User' });
  });

  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network Error');
  });
});