        const data = await getUserProfile();
        setProfile(data);
        setEditForm({ name: data.name, avatar: data.avatar || '' });
      } catch {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      const updated = await updateProfile(editForm);
      setProfile(updated);
      setIsEditing(false);
    } catch {
      setError('Failed to update profile.');
    } finally {
      setIsSaving(false);