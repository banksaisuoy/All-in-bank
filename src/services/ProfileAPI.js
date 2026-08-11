  return response.json();
};

export const fetchUserSettings = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/profile/settings`);
  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }
  return response.json();
};

export const updateProfile = async (updates) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/profile`, {
    method: 'PUT',