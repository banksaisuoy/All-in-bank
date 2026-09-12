      return;
    }

    if (formData.description && /[<>]/.test(formData.description)) {
      setError('Description contains invalid characters');
      return;
    }

    if (!formData.pin || formData.pin.length < 4) {
      setError('Please enter a valid PIN');
      return;
