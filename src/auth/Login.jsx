    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch {
      setError('Invalid credentials');
    }
  };