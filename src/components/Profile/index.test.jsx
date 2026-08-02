import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Profile } from './index';
import * as ProfileAPI from '../../services/ProfileAPI';

vi.mock('../../services/ProfileAPI', () => ({
  getUserProfile: vi.fn(),
  updateProfile: vi.fn(),
}));

describe('Profile Component', () => {
  const mockProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jane',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    ProfileAPI.getUserProfile.mockReturnValue(new Promise(() => {})); // Never resolves
    render(<Profile />);
    expect(screen.getByTestId('profile-loading')).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    ProfileAPI.getUserProfile.mockRejectedValue(new Error('Failed to load'));
    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByTestId('profile-error')).toBeInTheDocument();
    });
  });

  it('renders profile data successfully', async () => {
    ProfileAPI.getUserProfile.mockResolvedValue(mockProfile);
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.getByTestId('profile-component')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();
  });

  it('toggles edit mode and updates profile', async () => {
    ProfileAPI.getUserProfile.mockResolvedValue(mockProfile);
    ProfileAPI.updateProfile.mockResolvedValue({ ...mockProfile, name: 'Jane Smith', avatar: 'https://newavatar.com' });
    
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.getByTestId('profile-component')).toBeInTheDocument();
    });

    // Enter edit mode
    const editBtn = screen.getByTestId('edit-toggle-btn');
    fireEvent.click(editBtn);

    // Update name
    const nameInput = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });

    // Update avatar
    const avatarInput = screen.getByTestId('avatar-input');
    fireEvent.change(avatarInput, { target: { value: 'https://newavatar.com' } });

    // Save changes
    const saveBtn = screen.getByTestId('save-btn');
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(ProfileAPI.updateProfile).toHaveBeenCalledWith({ name: 'Jane Smith', avatar: 'https://newavatar.com' });
      // Should exit edit mode and show new name
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});