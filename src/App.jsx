import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import './index.css';

// Placeholder for the transaction details page
const TransactionDetails = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
      <p className="text-gray-600">Details for this transaction will appear here.</p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;