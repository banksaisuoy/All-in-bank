import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProfile, fetchUserSettings, updateProfile, updateSettings } from './ProfileAPI';

// Mock the auth api module
vi.mock('../auth/api', () => ({
  fetchWithAuth: vi.fn(),
}));
import { fetchWithAuth } from '../auth/api';

describe('ProfileAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('import.meta', { env: { VITE_API_BASE_URL: 'http://localhost' } });
  });

  it('getUserProfile fetches and returns user profile', async () => {
    const mockProfile = { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150' };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });
    
    const profile = await getUserProfile();
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/profile');
    expect(profile).toEqual(mockProfile);
  });

  it('fetchUserSettings fetches and returns user settings', async () => {
    const mockSettings = { notifications: true, darkMode: false, privacy: true };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSettings,
    });
    
    const settings = await fetchUserSettings();
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/profile/settings');
    expect(settings).toEqual(mockSettings);
  });

  it('updateProfile updates and returns new profile', async () => {
    const updates = { name: 'Jane Smith' };
    const mockUpdatedProfile = { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150' };
    
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUpdatedProfile,
    });
    
    const updatedProfile = await updateProfile(updates);
    
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    expect(updatedProfile).toEqual(mockUpdatedProfile);
  });

  it('updateSettings updates and returns new settings', async () => {
    const updates = { darkMode: true };
    const mockUpdatedSettings = { notifications: true, darkMode: true, privacy: true };
    
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUpdatedSettings,
    });
    
    const updatedSettings = await updateSettings(updates);
    
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/profile/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    expect(updatedSettings).toEqual(mockUpdatedSettings);
  });
});
