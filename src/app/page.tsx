import OverviewCards from '@/components/OverviewCards';
import { ActivityChart, BalanceHistoryChart } from '@/components/Charts';
import RecentTransactions from '@/components/RecentTransactions';
import QuickTransfer from '@/components/QuickTransfer';
import {
  getMockOverviewData,
  getMockChartData,
  getMockBalanceHistory,
  getMockTransactions
} from '@/lib/mockData';

export default function Home() {
  const overviewData = getMockOverviewData();
  const activityData = getMockChartData();
  const balanceData = getMockBalanceHistory();
  const transactions = getMockTransactions();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Jane! 👋</h1>
          <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your finances today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 text-sm">
            + New Transfer
          </button>
        </div>
      </div>

      <OverviewCards data={overviewData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={activityData} />
        <BalanceHistoryChart data={balanceData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
}
