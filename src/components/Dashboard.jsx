import { useState } from 'react';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useSpendingData } from '../hooks/useSpendingData';
import { SpendingChart } from './SpendingChart';
import { RecentTransactions } from './RecentTransactions';

export const Dashboard = () => {
  const [filter, setFilter] = useState('30days'); // '7days', '30days', 'all'