      return;
    }

    if (formData.amount <= 0) {
      setError('Amount must be positive');
      return;
    }

    try {
      setLoading(true);
      setError(null);
