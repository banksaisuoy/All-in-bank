import { fetchWithAuth } from '../auth/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const transferFunds = async ({ fromAccountId, toAccountId, amount, description, pin }) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/transfers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromAccountId, toAccountId, amount, description, pin }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Transfer failed');
  }
  
  return response.json();
};
