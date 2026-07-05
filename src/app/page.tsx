import { mockDashboardData } from "@/lib/mockData";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionList } from "@/components/TransactionList";
import { ChartWrapper } from "@/components/ChartWrapper";
import { Bell, Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { profile, balance, transactions, chartData } = mockDashboardData;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Good morning, {profile.name.split(' ')[0]}!</h1>
          <p className="text-slate-500">Here&apos;s what&apos;s happening with your finances today.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 transition-all"
            />
          </div>
          <button className="relative p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Top Row: Balance & Quick Actions */}
          <BalanceCard balance={balance} />

          {/* Middle Row: Charts */}
          <ChartWrapper data={chartData} />
        </div>

        {/* Right Column: Transactions */}
        <div className="lg:col-span-1">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
