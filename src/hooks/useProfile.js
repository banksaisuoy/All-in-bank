import { useState, useEffect } from 'react';
import { getUserProfile, updateSettings as updateSettingsApi } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile();
        if (mounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {

  const updateSettings = async (newSettings) => {
    try {
      const updated = await updateSettingsApi(newSettings);
      setProfile(prev => ({ ...prev, settings: updated }));
      return updated;
    } catch (err) {
