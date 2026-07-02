'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Overview</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
          />
        </div>

        <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-700">Jane Doe</p>
            <p className="text-xs text-gray-500">Premium Member</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
