"use client";

import React from "react";
import { Home, CreditCard, PieChart, Settings, LogOut, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Wallet, label: "Accounts", href: "/accounts" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: PieChart, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const Sidebar = React.memo(function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">All-in-bank</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-blue-50 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors z-10",
                isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
});
