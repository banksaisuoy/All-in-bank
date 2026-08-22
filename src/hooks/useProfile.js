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
          setProfile(data.profile || data);
          setSettings(data.settings || null);
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) {
          setIsLoading(false);
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const updated = await ProfileAPI.updateSettings(newSettings);
      setSettings(updated);
    } catch (err) {
      setError(err);
    }
  };

  return { profile, settings, isLoading, error, updateSettings };
};