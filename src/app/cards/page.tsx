"use client";

import { mockDashboardData } from "@/lib/mockData";
import { motion } from "framer-motion";
import { CreditCard, Plus, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardsPage() {
  const { cards } = mockDashboardData;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cards</h1>
          <p className="text-slate-500">Manage your credit and debit cards.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card, i) => {
          const isCredit = card.type === 'Credit';
          const cardBg = isCredit ? "bg-gradient-to-br from-slate-800 to-slate-900" : "bg-gradient-to-br from-blue-600 to-blue-800";
          const textColor = "text-white";

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className={cn("rounded-3xl p-8 shadow-xl aspect-[1.586/1] flex flex-col justify-between relative overflow-hidden", cardBg, textColor)}>
                {/* Decorative background circles */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-5"></div>

                <div className="flex justify-between items-start z-10">
                  <span className="font-medium text-lg tracking-wider opacity-80">{card.network}</span>
                  <Wifi className="w-8 h-8 opacity-80 transform rotate-90" />
                </div>

                <div className="z-10 mt-auto">
                  <div className="font-mono text-2xl md:text-3xl tracking-widest mb-6 opacity-90">
                    {card.cardNumber}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Cardholder</p>
                      <p className="font-medium tracking-wide">{card.cardholderName}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider opacity-60 mb-1 text-right">Expires</p>
                      <p className="font-medium tracking-wide">{card.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Details Panel */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">{isCredit ? 'Current Balance' : 'Available Balance'}</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {card.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                {isCredit && card.limit && (
                  <div className="text-right">
                    <p className="text-slate-500 text-sm">Credit Limit</p>
                    <p className="text-lg font-semibold text-slate-700">
                      {card.limit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
