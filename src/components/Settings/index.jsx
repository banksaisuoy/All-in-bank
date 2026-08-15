      try {
        const data = await fetchUserSettings();
        setSettingsData(data);
      } catch {
        setError('Failed to load settings.');
      } finally {
        setLoading(false);
      setSettingsData(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setError('Failed to save settings.');
    } finally {
      setIsSaving(false);