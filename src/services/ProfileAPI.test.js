import { describe, it, expect, vi } from 'vitest';
import { getUserProfile, updateProfile, updateSettings } from './ProfileAPI';
import { fetchWithAuth } from '../auth/api';

vi.mock('../auth/api', () => ({
  fetchWithAuth: vi.fn(),
}));

describe('ProfileAPI', () => {
  it('getUserProfile fetches and returns profile', async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Jane Doe', avatar: 'https://avatar.com/jane' }),
    });
    const profile = await getUserProfile();
    expect(profile).toHaveProperty('name', 'Jane Doe');
    expect(profile).toHaveProperty('avatar');

  it('updateProfile updates and returns new profile', async () => {
    const newProfileData = { name: 'Jane Smith', avatar: 'https://newavatar.com' };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => newProfileData,
    });
    const updatedProfile = await updateProfile(newProfileData);
    expect(updatedProfile).toEqual(newProfileData);
  });
  
  it('updateSettings updates and returns new settings', async () => {
    const newSettingsData = { notifications: false, twoFactor: true };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => newSettingsData,
    });
    const updatedSettings = await updateSettings(newSettingsData);
    expect(updatedSettings).toEqual(newSettingsData);
  });
});