import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Settings } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  updateSettings: vi.fn(),
}));

const mockSettings = { notifications: true, darkMode: false };

describe('Settings component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });

  it('renders settings and handles toggles', async () => {
    ProfileAPI.getUserProfile.mockResolvedValue(mockSettings);
    ProfileAPI.updateSettings.mockResolvedValue({ ...mockSettings, notifications: false, darkMode: true });
    
    render(<Settings />);
    
    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });
});