import { describe, it, expect, beforeEach } from 'vitest';
import { render, act, waitFor } from '@testing-library/react';
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from '../AuthProvider';

const TestComponent = () => {
  const { user, login, logout, refreshToken } = useContext(AuthContext);

  return (
    <div>
      <div data-testid="user">{user ? user.email : 'null'}</div>
      <button data-testid="login" onClick={() => login('test@example.com', 'password')}>Login</button>
      <button data-testid="logout" onClick={() => logout()}>Logout</button>
      <button data-testid="refresh" onClick={() => refreshToken()}>Refresh</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides null user initially', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('user').textContent).toBe('null');
    });
  });

  it('handles login and logout correctly', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click login
    await act(async () => {
      getByTestId('login').click();
    });

    await waitFor(() => {
      expect(getByTestId('user').textContent).toBe('test@example.com');
      expect(localStorage.getItem('token')).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    });

    // Click logout
    await act(async () => {
      getByTestId('logout').click();
    });

    await waitFor(() => {
      expect(getByTestId('user').textContent).toBe('null');
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
});