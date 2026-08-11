import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProfile, updateProfile, updateSettings } from './ProfileAPI';
import { fetchWithAuth } from '../auth/api';

vi.mock('../auth/api', () => ({
  fetchWithAuth: vi.fn(),
}));

describe('ProfileAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getUserProfile fetches profile data', async () => {
    const mockProfile = { name: 'Jane Doe', avatar: 'url' };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    const profile = await getUserProfile();
    expect(profile).toHaveProperty('name', 'Jane Doe');
    expect(profile).toHaveProperty('avatar');

  it('updateProfile updates and returns new profile', async () => {
    const newProfileData = { name: 'Jane Smith', avatar: 'https://newavatar.com' };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(newProfileData),
    });

    const updatedProfile = await updateProfile(newProfileData);
    expect(updatedProfile).toHaveProperty('name', 'Jane Smith');
    expect(updatedProfile).toHaveProperty('avatar', 'https://newavatar.com');
  });

  it('updateSettings updates and returns new settings', async () => {
    const newSettingsData = { darkMode: true, privacy: false };
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(newSettingsData),
    });

    const updatedSettings = await updateSettings(newSettingsData);
    expect(updatedSettings).toEqual(newSettingsData);
  });
