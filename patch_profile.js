const fs = require('fs');
const file = 'src/components/Profile/index.jsx';
let content = fs.readFileSync(file, 'utf8');

const search = `  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updated = await updateProfile(editForm);`;

const replace = `  const handleSave = async () => {
    // Basic validation
    if (!editForm.name || editForm.name.trim() === '') {
      setError('Name is required.');
      return;
    }

    if (editForm.avatar) {
      try {
        const url = new URL(editForm.avatar);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          setError('Avatar must be a valid HTTP/HTTPS URL.');
          return;
        }
      } catch (e) {
        setError('Avatar URL is invalid.');
        return;
      }
    }

    try {
      setError(null);
      setIsSaving(true);
      const updated = await updateProfile(editForm);`;

content = content.replace(search, replace);
fs.writeFileSync(file, content);
console.log('Patched Profile/index.jsx');