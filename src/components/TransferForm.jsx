      return;
    }

    if (formData.description && formData.description.length > 200) {
      setError('Description must be 200 characters or less');
      return;
    }

    // Basic XSS prevention: reject HTML tags in description
    if (formData.description && /[<>]/g.test(formData.description)) {
      setError('Description contains invalid characters (< or >)');
      return;
    }

    if (!formData.pin || !/^\d{4,6}$/.test(formData.pin)) {
      setError('Please enter a valid numeric PIN (4-6 digits)');
      return;
    }

