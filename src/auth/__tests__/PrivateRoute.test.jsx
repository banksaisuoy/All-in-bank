import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { PrivateRoute } from '../PrivateRoute';
import * as useAuthHook from '../useAuth';

// Mock react-router-dom Navigate
vi.mock('react-router-dom', () => ({
  Navigate: ({ to }) => <div data-testid="navigate">{to}</div>
}));

describe('PrivateRoute', () => {
  it('redirects to /login if user is not authenticated', () => {
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({ user: null });

    const { getByTestId, queryByText } = render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    expect(getByTestId('navigate').textContent).toBe('/login');
    expect(queryByText('Private Content')).toBeNull();
  });

  it('renders children if user is authenticated', () => {
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({ user: { email: 'test@example.com' } });

    const { queryByTestId, getByText } = render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    expect(queryByTestId('navigate')).toBeNull();
    expect(getByText('Private Content')).toBeInTheDocument();
  });
});