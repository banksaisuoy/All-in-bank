import React from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ProfileCard } from './components/ProfileCard';
import { AccountSettings } from './components/AccountSettings';
import { useProfile } from './hooks/useProfile';
import { Navbar } from './components/Navbar';
import { transactions } from './data/mockData';
import { ArrowLeft, Tag, Calendar, DollarSign, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import './index.css';

const ProfilePage = () => {
  );
};

// Transaction details page
const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center flex-col gap-4">
          <div className="text-xl text-gray-600">Transaction not found</div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-200 bg-gray-50 text-center">
              <div className={clsx(
                "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
                transaction.type === 'credit' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                <DollarSign className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                {transaction.type === 'credit' ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(transaction.amount))}
              </h2>
              <p className="text-gray-500 text-lg">{transaction.description}</p>
            </div>
            
            <div className="px-6 py-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Transaction Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 flex items-center mb-1">
                    <Calendar className="w-4 h-4 mr-1.5" /> Date & Time
                  </span>
                  <span className="text-base font-medium text-gray-900">
                    {new Date(transaction.date).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 flex items-center mb-1">
                    <Tag className="w-4 h-4 mr-1.5" /> Category
                  </span>
                  <span className="text-base font-medium text-gray-900 capitalize">
                    {transaction.category}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 flex items-center mb-1">
                    <FileText className="w-4 h-4 mr-1.5" /> Status
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-max">
                    Completed
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 flex items-center mb-1">
                    <DollarSign className="w-4 h-4 mr-1.5" /> Transaction ID
                  </span>
                  <span className="text-base font-medium text-gray-900 font-mono text-sm">
                    {transaction.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;