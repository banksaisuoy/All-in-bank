import { describe, it, expect, vi } from 'vitest';
import { fetchUserProfile, fetchUserSettings, updateUserSettings, getUserProfile, updateProfile, updateSettings } from './ProfileAPI';

describe('ProfileAPI', () => {
  it('fetchUserProfile returns mock user profile', async () => {
    const updatedSettings = await updateUserSettings(newSettings);
    expect(updatedSettings).toEqual(newSettings);
  });

  it('getUserProfile aliases fetchUserProfile', async () => {
    const profile = await getUserProfile();
    expect(profile).toHaveProperty('name', 'Jane Doe');
    expect(profile).toHaveProperty('avatar');
  });

  it('updateProfile updates and returns new profile', async () => {
    const newProfileData = { name: 'Jane Smith', avatar: 'https://newavatar.com' };
    const updatedProfile = await updateProfile(newProfileData);
    expect(updatedProfile).toHaveProperty('name', 'Jane Smith');
    expect(updatedProfile).toHaveProperty('avatar', 'https://newavatar.com');
  });

  it('updateSettings aliases updateUserSettings', async () => {
    const initialSettings = await fetchUserSettings();
    const newSettingsData = { ...initialSettings, darkMode: true, privacy: false };
    const updatedSettings = await updateSettings(newSettingsData);
    expect(updatedSettings).toEqual(newSettingsData);
  });
});
