import * as ProfileAPI from '../services/ProfileAPI';

vi.mock('../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateSettings: vi.fn()
}));

describe('useProfile hook', () => {
  it('should handle loading state and fetch data', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User' });
    

    const { result } = renderHook(() => useProfile());

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.profile).toBeNull();
    

    // Wait for the promises to resolve
    await act(async () => {
    // Loaded state
    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toEqual({ name: 'Test User' });
    
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ notifications: true });

    const { result } = renderHook(() => useProfile());
