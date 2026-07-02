"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userAccounts, recentTransactions, cashFlowData } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, CreditCard as CreditCardIcon, Plus } from 'lucide-react';

const CashFlowChart = dynamic(() => import('@/components/CashFlowChart'), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center text-slate-500">Loading chart...</div>
});

export default function Home() {
  const totalBalance = useMemo(() => userAccounts.reduce((acc, account) => acc + account.balance, 0), []);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Transfer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-slate-500">+2.5% from last month</p>
          </CardContent>
        </Card>

        {userAccounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              {account.type === 'Checking' ? <Wallet className="h-4 w-4 text-slate-500" /> : <CreditCardIcon className="h-4 w-4 text-slate-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500">{account.type} Account</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Cash Flow Overview</CardTitle>
            <CardDescription>Income vs Expenses over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <CashFlowChart data={cashFlowData} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>You made {recentTransactions.length} transactions recently.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.amount > 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{tx.description}</p>
                    <p className="text-sm text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`ml-auto font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
