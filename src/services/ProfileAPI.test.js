    const profile = await getUserProfile();
    expect(profile).toHaveProperty('name', 'Jane Doe');
    expect(profile).toHaveProperty('avatar');
  });

  it('updateProfile updates and returns new profile', async () => {
    const newProfileData = { name: 'Jane Smith', avatar: 'https://newavatar.com' };
    
    const updatedSettings = await updateSettings(newSettingsData);
    expect(updatedSettings).toEqual(newSettingsData);
  });
});