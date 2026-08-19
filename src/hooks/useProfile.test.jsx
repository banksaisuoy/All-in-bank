import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProfile } from './useProfile';
import * as ProfileAPI from '../services/ProfileAPI';

vi.mock('../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateSettings: vi.fn(),
}));

describe('useProfile', () => {
  it('should fetch profile successfully', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User' });
    const { result } = renderHook(() => useProfile());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.profile).toEqual({ name: 'Test User' });
  });

  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    const { result } = renderHook(() => useProfile());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.error).toBe('Network Error');
  });
});
