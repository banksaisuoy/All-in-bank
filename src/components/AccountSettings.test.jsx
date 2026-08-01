import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AccountSettings } from './AccountSettings';

describe('AccountSettings', () => {
  const defaultSettings = { notifications: true, twoFactor: false };

  it('renders nothing when no settings are provided', () => {
    const { container } = render(<AccountSettings settings={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders settings correctly and toggles values', () => {
    const mockOnUpdate = vi.fn();
    render(<AccountSettings settings={defaultSettings} onUpdate={mockOnUpdate} />);

    // Check if initial settings are rendered correctly (true vs false for aria-checked)
    const notificationToggle = screen.getByLabelText('Email Notifications Toggle');
    const twoFactorToggle = screen.getByLabelText('Two-Factor Authentication Toggle');
    
    expect(notificationToggle).toHaveAttribute('aria-checked', 'true');
    expect(twoFactorToggle).toHaveAttribute('aria-checked', 'false');

    // Click to toggle
    fireEvent.click(notificationToggle);
    fireEvent.click(twoFactorToggle);

    expect(notificationToggle).toHaveAttribute('aria-checked', 'false');
    expect(twoFactorToggle).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onUpdate with new settings when save is clicked', async () => {
    const mockOnUpdate = vi.fn().mockResolvedValue({});
    render(<AccountSettings settings={defaultSettings} onUpdate={mockOnUpdate} />);

    const twoFactorToggle = screen.getByLabelText('Two-Factor Authentication Toggle');
    fireEvent.click(twoFactorToggle); // set to true

    const saveButton = screen.getByText('Save Settings');
    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockOnUpdate).toHaveBeenCalledWith({ notifications: true, twoFactor: true });
  });
});