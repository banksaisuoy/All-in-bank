import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Settings } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  updateSettings: vi.fn(),
  getUserProfile: vi.fn(),
}));

describe('Settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });
});