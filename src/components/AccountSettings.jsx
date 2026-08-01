import React, { useState, useEffect } from 'react';
import { Bell, Shield } from 'lucide-react';

export const AccountSettings = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings || { notifications: true, twoFactor: false });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleToggle = (key) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (onUpdate) {
      await onUpdate(localSettings);
    }
    setIsSaving(false);
  };

  if (!settings) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your account activity.</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => handleToggle('notifications')}
            className={`${localSettings.notifications ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
            role="switch"
            aria-checked={localSettings.notifications}
            aria-label="Email Notifications Toggle"
          >
            <span className={`${localSettings.notifications ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => handleToggle('twoFactor')}
            className={`${localSettings.twoFactor ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
            role="switch"
            aria-checked={localSettings.twoFactor}
            aria-label="Two-Factor Authentication Toggle"
          >
            <span className={`${localSettings.twoFactor ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};