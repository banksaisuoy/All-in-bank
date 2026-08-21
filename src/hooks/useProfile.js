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
        const data = await getUserProfile();
        if (mounted) {
          setProfile(data);
          setSettings(data.settings || null);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (mounted) {

  const updateSettings = async (newSettings) => {
    try {
      const data = await updateSettingsApi(newSettings);
      setSettings(data);
      return data;
    } catch (err) {
      throw new Error(err.message || 'Failed to update settings');
    }
  };

  return { profile, settings, isLoading, error, updateSettings };
