'use client';

import { motion } from 'framer-motion';
import { Send, Plus } from 'lucide-react';
import { useState } from 'react';

const recentContacts = [
  { id: 1, name: 'Alex Johnson', initials: 'AJ', color: 'bg-purple-100 text-purple-600' },
  { id: 2, name: 'Sarah Smith', initials: 'SS', color: 'bg-emerald-100 text-emerald-600' },
  { id: 3, name: 'Mike Brown', initials: 'MB', color: 'bg-orange-100 text-orange-600' },
];

export default function QuickTransfer() {
  const [amount, setAmount] = useState('150');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Transfer</h3>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button className="flex flex-col items-center gap-2 min-w-[70px]">
          <div className="w-12 h-12 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Plus size={20} />
          </div>
          <span className="text-xs font-medium text-gray-500">Add</span>
        </button>

        {recentContacts.map(contact => (
          <button key={contact.id} className="flex flex-col items-center gap-2 min-w-[70px] group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-transparent group-hover:ring-blue-500 transition-all ${contact.color}`}>
              {contact.initials}
            </div>
            <span className="text-xs font-medium text-gray-700 truncate w-full text-center">{contact.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <label className="text-xs font-medium text-gray-500 mb-2 block">Amount</label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20">
            Send <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
