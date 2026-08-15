    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Invalid stored user
        localStorage.removeItem('token');
        localStorage.removeItem('user');