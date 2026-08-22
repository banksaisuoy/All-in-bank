import { useState, useEffect } from 'react';
import * as ProfileAPI from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await ProfileAPI.getUserProfile();
        if (mounted) {
          setProfile(data.profile);
          setSettings(data.settings);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
    };
  }, []);

  const updateProfile = async (updates) => {
    try {
      setIsLoading(true);
      const updated = await ProfileAPI.updateProfile(updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      setIsLoading(true);
      const updated = await ProfileAPI.updateSettings(newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    settings,
    isLoading,
    error,
    updateProfile,
    updateSettings
  };
};