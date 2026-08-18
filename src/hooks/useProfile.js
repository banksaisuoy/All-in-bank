import { useState, useEffect } from 'react';
import { getUserProfile, updateSettings as updateSettingsApi } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    const loadData = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserProfile();
        
        if (mounted) {
          setProfile(profileData);
          setError(null);
        }
      } catch (err) {

  const updateSettings = async (newSettings) => {
    try {
      const updated = await updateSettingsApi(newSettings);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    }
  };

  return { profile, isLoading, error, updateSettings };
};