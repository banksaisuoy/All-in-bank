import { fetchWithAuth } from '../auth/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const getUserProfile = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/profile`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
};

export const updateProfile = async (updates) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
};

export const updateSettings = async (updates) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/profile/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update settings');
  }
  return response.json();
};
