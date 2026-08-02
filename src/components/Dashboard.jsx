import React, { useState } from 'react';
import { useSpendingData } from '../hooks/useSpendingData';
import { SpendingChart } from './SpendingChart';
import { RecentTransactions } from './RecentTransactions';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="mt-8">
          <RecentTransactions transactions={data.transactions || []} />
        </div>

      </div>
    </div>
  );
      </div>
    </motion.div>
  );
};