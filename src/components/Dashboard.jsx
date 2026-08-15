import { SpendingChart } from './SpendingChart';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { RecentTransactions } from './RecentTransactions';
import { motion } from 'framer-motion';

export const Dashboard = () => {
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={data.recentTransactions} />

      </div>
    </div>
  );