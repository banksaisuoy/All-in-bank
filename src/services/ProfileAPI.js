const mockUserProfile = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown USA',
  role: 'Premium Member'
};

const mockUserSettings = {
  notifications: true,
  twoFactor: false
};

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUserProfile = async () => {
  await delay(800);
  return { ...mockUserProfile };
};

export const fetchUserSettings = async () => {
  await delay(800);
  return { ...mockUserSettings };
};

export const updateUserSettings = async (newSettings) => {
  await delay(800);
  Object.assign(mockUserSettings, newSettings);
  return { ...mockUserSettings };
};