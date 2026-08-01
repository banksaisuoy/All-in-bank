import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Send, Building2 } from 'lucide-react';
import { clsx } from 'clsx';

export const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: Receipt },
    { name: 'Transfer', path: '/transfer', icon: Send },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-indigo-600" />
                <span className="font-bold text-xl text-gray-900">All-in-bank</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={clsx(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};