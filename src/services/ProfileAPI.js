  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown USA',
  role: 'Premium Member',
  avatar: 'https://i.pravatar.cc/150?u=jane.doe@example.com'
};

const mockUserSettings = {
  notifications: true,
  twoFactor: false,
  darkMode: false,
  privacy: true
};

// Simulate network delay
  await delay(800);
  Object.assign(mockUserSettings, newSettings);
  return { ...mockUserSettings };
};

export const getUserProfile = async () => {
  return await fetchUserProfile();
};

export const updateProfile = async (updates) => {
  await delay(800);
  Object.assign(mockUserProfile, updates);
  return { ...mockUserProfile };
};

export const updateSettings = async (updates) => {
  return await updateUserSettings(updates);
};