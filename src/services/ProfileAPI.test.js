import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProfile, updateSettings } from './ProfileAPI';
import { fetchWithAuth } from '../auth/api';

vi.mock('../auth/api', () => ({
  fetchWithAuth: vi.fn(),
}));

describe('ProfileAPI', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getUserProfile returns profile', async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Jane Doe', avatar: 'url' })
    });
    const profile = await getUserProfile();
    expect(profile).toHaveProperty('name', 'Jane Doe');
    expect(profile).toHaveProperty('avatar');
  });

  it('updateSettings updates and returns new settings', async () => {
    const newSettingsData = { notifications: true, theme: 'dark' };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => newSettingsData
    });
    
    const updatedSettings = await updateSettings(newSettingsData);
    expect(updatedSettings).toEqual(newSettingsData);
  });
});