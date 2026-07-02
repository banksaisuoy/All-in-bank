import React from 'react';
import { Home, CreditCard, PieChart, Settings, User } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Accounts', icon: CreditCard, href: '#' },
    { name: 'Investments', icon: PieChart, href: '#' },
    { name: 'Profile', icon: User, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    <div className="hidden md:flex shrink-0 h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center px-6 text-2xl font-bold tracking-tight">
        All-in-Bank
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">JD</div>
          <div className="text-sm">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-slate-400">Premium Member</p>
          </div>
        </div>
      </div>
    </div>
  );
}
