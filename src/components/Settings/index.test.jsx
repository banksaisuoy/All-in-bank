import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Settings } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  fetchUserSettings: vi.fn(),
  updateSettings: vi.fn(),
}));

describe('Settings Component', () => {
  const mockSettings = {
    notifications: true,
    twoFactor: false,
    darkMode: false,
    privacy: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    ProfileAPI.fetchUserSettings.mockReturnValue(new Promise(() => {})); // Never resolves
    render(<Settings />);
    expect(screen.getByTestId('settings-loading')).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    ProfileAPI.fetchUserSettings.mockRejectedValue(new Error('Failed to load'));
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });

  it('renders settings and handles toggles', async () => {
    ProfileAPI.fetchUserSettings.mockResolvedValue(mockSettings);
    ProfileAPI.updateSettings.mockResolvedValue({ ...mockSettings, notifications: false, darkMode: true });
    
    render(<Settings />);
    
    await waitFor(() => {
      expect(screen.getByTestId('settings-component')).toBeInTheDocument();
    });

    // Check initial state
    const notifToggle = screen.getByTestId('toggle-notifications');
    const darkModeToggle = screen.getByTestId('toggle-darkMode');
    
    expect(notifToggle).toHaveAttribute('aria-checked', 'true');
    expect(darkModeToggle).toHaveAttribute('aria-checked', 'false');

    // Toggle them
    fireEvent.click(notifToggle);
    fireEvent.click(darkModeToggle);

    expect(notifToggle).toHaveAttribute('aria-checked', 'false');
    expect(darkModeToggle).toHaveAttribute('aria-checked', 'true');

    // Save
    const saveBtn = screen.getByTestId('save-settings-btn');
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(ProfileAPI.updateSettings).toHaveBeenCalledWith({
        ...mockSettings,
        notifications: false,
        darkMode: true
      });
      expect(screen.getByTestId('save-success')).toBeInTheDocument();
    });
  });
});