    }

    if (editForm.avatar) {
      // Prevent javascript: URIs to mitigate XSS
      if (editForm.avatar.trim().toLowerCase().startsWith('javascript:')) {
        setError('Avatar URL contains invalid scheme.');
        return;
      }

      try {
        const url = new URL(editForm.avatar);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          return;
        }
      } catch (e) {
        // Allow relative URLs if they don't start with javascript:
        if (!editForm.avatar.startsWith('/')) {
          setError('Avatar URL is invalid.');
          return;
        }
      }
    }
