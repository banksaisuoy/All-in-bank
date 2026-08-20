import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Settings } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateSettings: vi.fn(),
}));

describe('Settings component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders settings loading state', () => {
    ProfileAPI.getUserProfile.mockReturnValue(new Promise(() => {}));
    render(<Settings />);
    expect(screen.getByTestId('settings-loading')).toBeInTheDocument();
  });

  it('renders settings fields from profile', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ notifications: true, darkMode: false });
    render(<Settings />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('settings-loading')).not.toBeInTheDocument();
    });

    const notifToggle = screen.getByTestId('notifications-toggle');
    expect(notifToggle).toHaveClass('bg-indigo-600');
    
    const darkToggle = screen.getByTestId('dark-mode-toggle');
    expect(darkToggle).toHaveClass('bg-gray-200');
  });

  it('calls updateSettings when save button is clicked', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ notifications: true, darkMode: false });
    ProfileAPI.updateSettings.mockResolvedValueOnce({});
    
    render(<Settings />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('settings-loading')).not.toBeInTheDocument();
    });
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(ProfileAPI.updateSettings).toHaveBeenCalled();
    });
  });

  it('displays error message if update fails', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ notifications: true, darkMode: false });
    ProfileAPI.updateSettings.mockRejectedValueOnce(new Error('Update failed'));
    
    render(<Settings />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('settings-loading')).not.toBeInTheDocument();
    });
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });
});