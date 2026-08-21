import { useState, useEffect } from 'react';
import { getUserProfile, updateSettings as updateSettingsApi } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    const loadData = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserProfile();
        
        if (mounted) {
          setProfile(profileData);
          setSettings(profileData.settings || null);
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
      const updated = await updateSettingsApi(newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    }
  };

  return { profile, settings, isLoading, error, updateSettings };
};