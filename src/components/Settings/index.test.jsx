import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
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

    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });
});