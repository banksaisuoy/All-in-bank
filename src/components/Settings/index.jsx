import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Bell, Moon, Save, Check } from 'lucide-react';
import { getUserProfile, updateSettings } from '../../services/ProfileAPI';

const ToggleSwitch = ({ enabled, onChange, testId }) => (
  <button
    data-testid={testId}
    onClick={onChange}
    className={clsx(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
      enabled ? "bg-indigo-600" : "bg-gray-200"
    )}
  >
    <span
      className={clsx(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
        enabled ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);

export const Settings = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getUserProfile();
        setSettingsData(data);
      } catch {
        setError('Failed to load settings.');
      }
    };
    loadSettings();
  }, []);

  const handleToggle = (key) => {
    setSettingsData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(settingsData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setError('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return <div data-testid="settings-error">{error}</div>;
  }

  if (!settingsData) {
    return <div data-testid="settings-loading">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </div>
          <ToggleSwitch 
            enabled={settingsData.notifications} 
            onChange={() => handleToggle('notifications')}
            testId="notifications-toggle"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </div>
          <ToggleSwitch 
            enabled={settingsData.darkMode} 
            onChange={() => handleToggle('darkMode')}
            testId="dark-mode-toggle"
          />
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="mt-6 flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSaving ? (
            <span>Saving...</span>
          ) : showSuccess ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};