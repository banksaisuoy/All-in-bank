import { useState, useEffect } from 'react';
import { getUserProfile, updateSettings as updateUserSettings } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    const loadData = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserProfile();
        const settingsData = profileData.settings || {};
        
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