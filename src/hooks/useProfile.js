import { useState, useEffect } from 'react';
import { fetchUserProfile, fetchUserSettings, updateUserSettings } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [profileData, settingsData] = await Promise.all([
          fetchUserProfile(),
          fetchUserSettings()
        ]);
        
        if (mounted) {
          setProfile(profileData);
          setSettings(settingsData);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load profile data');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const updated = await updateUserSettings(newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update settings');
      throw err;
    }
  };

  return { profile, settings, isLoading, error, updateSettings };
};