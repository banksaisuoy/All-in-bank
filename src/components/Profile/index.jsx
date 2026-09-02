  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', avatar: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
    if (isEditing) {
      setEditForm({ name: profile.name, avatar: profile.avatar || '' });
    }
    setFormError(null);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
  setFormError(null);
  if (!editForm.name || !editForm.name.trim()) {
    setFormError('Name is required');
    return;
  }
  if (/[<>]/.test(editForm.name) || (editForm.avatar && /[<>]/.test(editForm.avatar))) {
    setFormError('Input contains invalid characters');
    return;
  }
  try {
      setIsSaving(true);
      const updated = await updateProfile(editForm);
      setProfile(updated);
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {formError && (
            <div className="w-full text-red-500 bg-red-50 p-3 rounded-md" data-testid="form-error">
              {formError}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="relative group shrink-0 mx-auto sm:mx-0">
            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
              {isEditing && editForm.avatar ? (
                <img src={editForm.avatar} alt="Avatar Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </motion.div>
