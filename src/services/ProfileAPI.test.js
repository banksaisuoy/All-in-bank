import { describe, it, expect, vi } from 'vitest';
import { fetchUserProfile, fetchUserSettings, updateUserSettings } from './ProfileAPI';

describe('ProfileAPI', () => {
  it('fetchUserProfile returns mock user profile', async () => {
    const profile = await fetchUserProfile();
    expect(profile).toHaveProperty('name', 'Jane Doe');
    expect(profile).toHaveProperty('email', 'jane.doe@example.com');
  });

  it('fetchUserSettings returns mock user settings', async () => {
    const settings = await fetchUserSettings();
    expect(settings).toHaveProperty('notifications');
    expect(settings).toHaveProperty('twoFactor');
  });

  it('updateUserSettings updates and returns new settings', async () => {
    const initialSettings = await fetchUserSettings();
    const newSettings = { ...initialSettings, notifications: false, twoFactor: true };
    const updatedSettings = await updateUserSettings(newSettings);
    expect(updatedSettings).toEqual(newSettings);
  });
});
