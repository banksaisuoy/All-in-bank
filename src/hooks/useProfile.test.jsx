import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProfile } from './useProfile';
import * as ProfileAPI from '../services/ProfileAPI';
  it('should handle loading state and fetch data', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User', settings: { notifications: true } });
    
    const { result } = renderHook(() => useProfile());

    // Wait for the state to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.profile).toEqual({ name: 'Test User', settings: { notifications: true } });
    expect(result.current.settings).toEqual({ notifications: true });
    expect(result.current.error).toBeNull();
  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    
    const { result } = renderHook(() => useProfile());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Network Error');
  });
});