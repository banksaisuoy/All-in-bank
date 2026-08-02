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
              title="Total Balance" 
              amount={totalBalance} 
              icon={Wallet} 
              trend="+2.5%" 
            />
            <StatCard 
              title="Total Income" 
              amount={totalIncome} 
              icon={TrendingUp} 
              trend="+14.2%" 
            />
            <StatCard 
              title="Total Expenses" 
              amount={1234.56} 
              icon={TrendingDown} 
              trend="-4.1%" 
            />
            <StatCard 
              title="Pending" 
              amount={450.00} 
              icon={Clock} 
            />
          </div>
          
          <RecentTransactionsTable transactions={recentTransactions} />
        </div>
      </main>
    </div>
  );
};