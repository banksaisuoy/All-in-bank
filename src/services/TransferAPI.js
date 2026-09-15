const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const transferFunds = async ({ fromAccountId, toAccountId, amount, description, pin }) => {
  if (amount <= 0 || isNaN(amount)) {
    throw new Error('Invalid transfer amount');
  }

  const response = await fetchWithAuth(`${API_BASE_URL}/transfers`, {
    method: 'POST',
    headers: {
