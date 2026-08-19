import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Settings } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateSettings: vi.fn(),
}));

describe('Settings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });
});