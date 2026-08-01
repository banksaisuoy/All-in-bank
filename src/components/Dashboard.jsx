import React, { useState } from 'react';
import { useSpendingData } from '../hooks/useSpendingData';
import { SpendingChart } from './SpendingChart';
import { RecentTransactions } from './RecentTransactions';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const [filter, setFilter] = useState('30days'); // '7days', '30days', 'all'
  const { transactions, data, metrics } = useSpendingData(filter);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-8 font-sans">
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
      </div>
    </motion.div>
  );
};