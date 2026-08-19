import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProfile } from './useProfile';
import * as ProfileAPI from '../services/ProfileAPI';

vi.mock('../services/ProfileAPI', () => ({
}));

describe('useProfile', () => {
  it('should fetch profile successfully', async () => {
    ProfileAPI.getUserProfile.mockResolvedValueOnce({ name: 'Test User' });
    const { result } = renderHook(() => useProfile());

  it('should handle API errors', async () => {
    ProfileAPI.getUserProfile.mockRejectedValueOnce(new Error('Network Error'));
    const { result } = renderHook(() => useProfile());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network Error');
  });