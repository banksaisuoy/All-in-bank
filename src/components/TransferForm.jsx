      return;
    }


    if (formData.description && formData.description.length > 200) {
      setError('Description must be 200 characters or less');
      return;
    }

    if (formData.description && /[<>]/.test(formData.description)) {
      setError('Description contains invalid characters');
      return;
    }

    if (!formData.pin || formData.pin.length < 4) {
      setError('Please enter a valid PIN');
      return;
