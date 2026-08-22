import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProfile } from './useProfile';
import * as ProfileAPI from '../services/ProfileAPI';

vi.mock('../services/ProfileAPI');

describe('useProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    const { result } = renderHook(() => useProfile());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});