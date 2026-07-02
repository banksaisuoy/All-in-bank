'use client';

import Link from 'next/link';
import { Home, CreditCard, DollarSign, Settings, LogOut, ArrowRightLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | false)[]) => {
  return twMerge(clsx(inputs));
};

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: ArrowRightLeft, label: 'Transactions', href: '/transactions' },
  { icon: CreditCard, label: 'Cards', href: '/cards' },
  { icon: DollarSign, label: 'Loans', href: '/loans' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen hidden md:flex flex-col sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          All-in-bank
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-red-600 rounded-xl transition-colors font-medium w-full">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
