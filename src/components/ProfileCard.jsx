import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-6 mb-4">
        <div className="bg-indigo-100 p-4 rounded-full">
          <User className="h-12 w-12 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-gray-500">{profile.role || 'User'}</p>
        </div>
      </div>
      <div className="space-y-3 mt-6">
        <div className="flex items-center text-gray-600">
          <Mail className="h-5 w-5 mr-3" />
          <span>{profile.email}</span>
        </div>
        {profile.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="h-5 w-5 mr-3" />
            <span>{profile.phone}</span>
          </div>
        )}
        {profile.address && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-3" />
            <span>{profile.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};