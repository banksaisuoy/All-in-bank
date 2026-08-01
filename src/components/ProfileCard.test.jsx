import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfileCard } from './ProfileCard';

describe('ProfileCard', () => {
  it('renders nothing when no profile is provided', () => {
    const { container } = render(<ProfileCard profile={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders profile details correctly', () => {
    const mockProfile = {
      name: 'John Smith',
      role: 'Admin',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Street'
    };

    render(<ProfileCard profile={mockProfile} />);

    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('123 Street')).toBeInTheDocument();
  });
});