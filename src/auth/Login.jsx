      return;
    }

    if (email && /[<>]/.test(email)) {
      setError('Email contains invalid characters');
      return;
    }

    try {
      await login(email, password);
      navigate('/', { replace: true });
