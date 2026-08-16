import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Bell, Moon, Shield, Save, Check } from 'lucide-react';
import { fetchUserSettings, updateSettings } from '../../services/ProfileAPI';

const ToggleSwitch = ({ enabled, onChange, testId }) => (
  <button
    type="button"
    role="switch"
    aria-checked={enabled}
    onClick={onChange}
    data-testid={testId}
    className={clsx(
      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
      enabled ? "bg-indigo-600" : "bg-gray-200"
    )}
  >
    <span
      className={clsx(
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        enabled ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

export const Settings = () => {
  const [settings, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchUserSettings();
        setSettingsData(data);
        setError('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleToggle = (key) => {
    setSettingsData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updated = await updateSettings(settings);
      setSettingsData(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setError('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]" data-testid="settings-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-50 p-4 rounded-md" data-testid="settings-error">
        {error}
      </div>
    );
  }

  if (!settings) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      data-testid="settings-component"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive alerts for account activity.</p>
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.notifications}
              onChange={() => handleToggle('notifications')}
              testId="toggle-notifications"
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Moon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">Toggle dark appearance.</p>
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
              testId="toggle-darkMode"
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Privacy Mode</h3>
                <p className="text-sm text-gray-500">Hide balances and sensitive info.</p>
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.privacy}
              onChange={() => handleToggle('privacy')}
              testId="toggle-privacy"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          {saveSuccess && (
            <span className="text-sm text-green-600 flex items-center gap-1" data-testid="save-success">
              <Check className="h-4 w-4" /> Saved successfully
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            data-testid="save-settings-btn"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};