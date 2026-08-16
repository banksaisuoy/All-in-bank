      try {
        const data = await fetchUserSettings();
        setSettingsData(data);
        setError(null);
      } catch {
        setError('Failed to load settings.');
      } finally {
        setLoading(false);
