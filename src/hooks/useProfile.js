import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/ProfileAPI';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [_isLoading, _setIsLoading] = useState(true);
  const [_error, _setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        _setIsLoading(true);
        const data = await getUserProfile();
        if (mounted) {
          setProfile(data);
        }
      } catch (err) {
        if (mounted) {
          _setError(err.message || 'Failed to fetch profile');
        }
      } finally {
        if (mounted) {
          _setIsLoading(false);
        }
      }
    };
      mounted = false;
    };
  }, []);

  return { profile, isLoading: _isLoading, error: _error };
};