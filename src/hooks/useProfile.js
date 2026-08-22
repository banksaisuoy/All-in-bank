  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        setIsLoading(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadData();
    return () => { mounted = false; };
  }, []);

  const updateSettings = async (newSettings) => {
    try {