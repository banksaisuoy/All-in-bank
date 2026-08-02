  // Calculate stats from mock data
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
            <Link 
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Total Balance" 
              value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalBalance)} 
              icon={Wallet}
              color="bg-indigo-500"
            />
            <StatCard 
              label="Total Income" 
              value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalIncome)} 
              icon={TrendingUp}
              color="bg-green-500"
              subtitle="+4.5% from last month"
            />
            <StatCard 
              label="Total Expenses" 
              value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalExpenses)} 
              icon={TrendingDown}
              color="bg-red-500"
              subtitle="-1.2% from last month"
            />
            <StatCard 
              label="Pending Transactions" 
              value="3" 
              icon={Clock}
              color="bg-yellow-500"
            />
          </div>

          <div className="mt-8">
            <RecentTransactionsTable transactions={recentTransactions} />
          </div>
        </div>
      </main>
    </div>
  );
};
