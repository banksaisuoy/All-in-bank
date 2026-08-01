import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProfile } from './useProfile';
import * as ProfileAPI from '../services/ProfileAPI';

vi.mock('../services/ProfileAPI', () => ({
  fetchUserProfile: vi.fn(),
  fetchUserSettings: vi.fn(),
  updateUserSettings: vi.fn()
}));

describe('useProfile hook', () => {
  it('should handle loading state and fetch data', async () => {
    ProfileAPI.fetchUserProfile.mockResolvedValueOnce({ name: 'Test User' });
    ProfileAPI.fetchUserSettings.mockResolvedValueOnce({ notifications: true });

    const { result } = renderHook(() => useProfile());

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.profile).toBeNull();
    expect(result.current.settings).toBeNull();

    // Wait for the promises to resolve
    await act(async () => {
      // Vitest act handles the promise queue
    });

    // Loaded state
    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toEqual({ name: 'Test User' });
    expect(result.current.settings).toEqual({ notifications: true });
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    ProfileAPI.fetchUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    ProfileAPI.fetchUserSettings.mockResolvedValueOnce({ notifications: true });

    const { result } = renderHook(() => useProfile());

    await act(async () => {});

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network Error');
  });
});