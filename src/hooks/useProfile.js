import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [_isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = await getUserProfile();
        if (mounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
