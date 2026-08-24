        }
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  return { profile, isLoading: _isLoading, error: _error };
};
