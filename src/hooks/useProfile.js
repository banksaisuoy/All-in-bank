  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update settings');
      throw err;
    }
  };

  return { profile, isLoading, error, updateSettings };
};