      return;
    }

    // Basic XSS prevention: reject HTML tags in description
    if (formData.description && /[<>]/.test(formData.description)) {
      setError('Description contains invalid characters (< or >)');
      return;
    }

    if (formData.description && formData.description.length > 200) {
      setError('Description is too long (maximum 200 characters)');
      return;
    }

    try {
      setLoading(true);
      setError(null);
