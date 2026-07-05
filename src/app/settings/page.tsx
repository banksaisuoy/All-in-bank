"use client";

import { mockDashboardData } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function SettingsPage() {
  const { profile } = mockDashboardData;
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    const timeoutId = setTimeout(() => setIsSaved(false), 3000);
    // No return needed
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your profile and preferences.</p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div>
              <button type="button" className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                Change Avatar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                id="name"
                defaultValue={profile.name}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                id="email"
                defaultValue={profile.email}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {isSaved ? (
              <span className="text-green-600 font-medium animate-pulse">Settings saved successfully!</span>
            ) : (
              <span></span>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
