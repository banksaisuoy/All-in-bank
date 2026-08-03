import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Receipt } from 'lucide-react';
import { accounts } from '../data/mockData';

export const TransferSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transferDetails } = location.state || {};

  if (!transferDetails) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No transfer details found.</p>
        <button
          onClick={() => navigate('/transfer')}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Return to Transfer
        </button>
      </div>
    );
  }

  const fromAccount = accounts.find(a => a.id === transferDetails.fromAccountId);
  const toAccount = accounts.find(a => a.id === transferDetails.toAccountId);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-8 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="mb-6 text-green-500"
        >
          <CheckCircle className="h-20 w-20" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Your funds have been successfully transferred. A confirmation has been sent to your email.
        </p>
        
        <div className="w-full bg-gray-50 rounded-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Transaction Details</h3>
          
          <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Amount</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">
                ${parseFloat(transferDetails.amount).toFixed(2)}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Reference ID</dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">
                {transferDetails.referenceId}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">From</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {fromAccount ? fromAccount.name : 'Unknown Account'}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">To</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {toAccount ? toAccount.name : 'External Account'}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(transferDetails.date).toLocaleString()}
              </dd>
            </div>
            
            {transferDetails.description && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {transferDetails.description}
                </dd>
              </div>
            )}
          </dl>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => navigate('/transfer')}
            className="inline-flex justify-center items-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Make Another Transfer
          </button>
          
          <button
            onClick={() => navigate('/transactions')}
            className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Receipt className="mr-2 h-4 w-4" />
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
};