          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Spending Trend</h2>
            <div className="h-[300px] w-full">
               <SpendingChart data={data?.trendData || []} />
            </div>
          </div>

             <h2 className="text-lg font-semibold mb-4 text-gray-800">Spending by Category</h2>
             <div className="flex-1 overflow-auto">
               <div className="space-y-4 mt-2">
                 {(data?.categoryData || []).map((cat, idx) => (
                   <div key={idx} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={cn("w-3 h-3 rounded-full", cat.color)}></div>