  };

  const handleSave = async () => {
    // Basic validation to ensure localSettings is valid
    if (typeof localSettings.notifications !== 'boolean' || typeof localSettings.twoFactor !== 'boolean') {
      console.error('Invalid settings state');
      return;
    }
    
    setIsSaving(true);
    if (onUpdate) {
      try {
        await onUpdate(localSettings);
      } catch (err) {
        console.error('Failed to update settings:', err);
      }
    }
    setIsSaving(false);
  };
