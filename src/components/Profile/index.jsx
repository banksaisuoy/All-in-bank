        const data = await getUserProfile();
        setProfile(data);
        setEditForm({ name: data.name, avatar: data.avatar || '' });
        setError(null);
      } catch {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);