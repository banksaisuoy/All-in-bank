import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSpendingData } from '../hooks/useSpendingData';
import { SpendingChart } from './SpendingChart';
// import { RecentTransactions } from './RecentTransactions';