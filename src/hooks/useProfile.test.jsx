import { describe, it, expect, vi } from 'vitest';
import { useProfile } from './useProfile';
import * as ProfileAPI from '../services/ProfileAPI';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  it('should handle loading state and fetch data', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User', settings: { notifications: true } });
    
    const { result } = renderHook(() => useProfile());

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

    expect(result.current.error).toEqual(new Error('Network Error'));
  });
});