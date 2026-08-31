      return;
    }

    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (/[<>]/.test(email)) {
      setError('Invalid characters detected in email');
      return;
    }

    try {
      await login(email, password);
      navigate('/', { replace: true });
