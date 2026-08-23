  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', avatar: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setEditForm({ name: profile.name, avatar: profile.avatar || '' });
    }
    setIsEditing(!isEditing);
    setFormError('');
  };

  const handleSave = async () => {
    setFormError('');
    if (!editForm.name || !editForm.name.trim()) {
      setFormError('Name is required');
      return;
    }
    if (editForm.name.length > 100) {
      setFormError('Name must be 100 characters or less');
      return;
    }
    if (/[<>]/.test(editForm.name)) {
      setFormError('Name contains invalid characters');
      return;
    }
    if (editForm.avatar) {
      if (editForm.avatar.trim().toLowerCase().startsWith('javascript:')) {
        setFormError('Avatar contains invalid scheme');
        return;
      }
    }

    try {
      setIsSaving(true);
      const updated = await updateProfile(editForm);
            </div>

            {isEditing && (
              <div className="pt-4 flex flex-col items-end gap-2">
                {formError && (
                  <p className="text-sm text-red-600" data-testid="form-error">{formError}</p>
                )}
                <button
                  onClick={handleSave}
                  disabled={isSaving}