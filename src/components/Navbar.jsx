import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Settings, Building2, Send } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../auth/useAuth';


  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: Send },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];