import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { User, Mail, Edit2, X, Check } from 'lucide-react';
import { getUserProfile, updateProfile } from '../../services/ProfileAPI';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', avatar: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setEditForm({ name: data.name, avatar: data.avatar || '' });
      } catch {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({ name: profile.name, avatar: profile.avatar || '' });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updated = await updateProfile(editForm);
      setProfile(updated);
      setIsEditing(false);
    } catch {
      setError('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]" data-testid="profile-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-50 p-4 rounded-md" data-testid="profile-error">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      data-testid="profile-component"
    >
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          <button
            onClick={handleEditToggle}
            className={clsx(
              "p-2 rounded-full transition-colors",
              isEditing ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            )}
            data-testid="edit-toggle-btn"
          >
            {isEditing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="relative group shrink-0 mx-auto sm:mx-0">
            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
              {isEditing && editForm.avatar ? (
                <img src={editForm.avatar} alt="Avatar Preview" className="h-full w-full object-cover" />
              ) : profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-indigo-100">
                  <User className="h-16 w-16 text-indigo-600" />
                </div>
              )}
            </div>
            {isEditing && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                <input
                  type="text"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm(prev => ({ ...prev, avatar: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="https://..."
                  data-testid="avatar-input"
                />
              </div>
            )}
          </div>

          <div className="flex-1 w-full space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  data-testid="name-input"
                />
              ) : (
                <p className="text-lg text-gray-900 font-medium">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span>{profile.email}</span>
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  data-testid="save-btn"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};