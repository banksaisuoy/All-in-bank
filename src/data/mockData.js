export const accounts = [
  { id: '1', name: 'Checking Account', type: 'Checking', balance: 5000.00, currency: 'USD' },
  { id: '2', name: 'Savings Account', type: 'Savings', balance: 12500.50, currency: 'USD' }
];

export const transactions = [
  { id: 't1', accountId: '1', date: '2023-10-01T10:00:00Z', description: 'Grocery Store', amount: -150.25, type: 'debit', category: 'Food' },
  { id: 't2', accountId: '1', date: '2023-10-02T14:30:00Z', description: 'Salary Deposit', amount: 3000.00, type: 'credit', category: 'Income' },
  { id: 't3', accountId: '1', date: '2023-10-03T09:15:00Z', description: 'Electric Bill', amount: -85.50, type: 'debit', category: 'Utilities' },
  { id: 't4', accountId: '1', date: '2023-10-04T18:45:00Z', description: 'Restaurant', amount: -45.00, type: 'debit', category: 'Food' },
  { id: 't5', accountId: '1', date: '2023-10-05T11:20:00Z', description: 'Online Shopping', amount: -120.99, type: 'debit', category: 'Shopping' },
  { id: 't6', accountId: '1', date: '2023-10-06T08:00:00Z', description: 'Gym Membership', amount: -50.00, type: 'debit', category: 'Health' },
  { id: 't7', accountId: '1', date: '2023-10-07T16:10:00Z', description: 'Coffee Shop', amount: -4.50, type: 'debit', category: 'Food' },
  { id: 't8', accountId: '1', date: '2023-10-08T13:40:00Z', description: 'Refund', amount: 25.00, type: 'credit', category: 'Shopping' },
  { id: 't9', accountId: '1', date: '2023-10-09T19:00:00Z', description: 'Movie Tickets', amount: -30.00, type: 'debit', category: 'Entertainment' },
  { id: 't10', accountId: '1', date: '2023-10-10T12:00:00Z', description: 'Gas Station', amount: -40.00, type: 'debit', category: 'Transport' },
];