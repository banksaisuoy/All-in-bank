export const getRecentTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          date: new Date('2024-05-01T10:00:00Z').toISOString(),
          description: 'Grocery Store',
          amount: 150.25,
          type: 'debit',
          balanceAfter: 2850.75,
        },
        {
          id: 2,
          date: new Date('2024-05-02T14:30:00Z').toISOString(),
          description: 'Salary Deposit',
          amount: 3000.00,
          type: 'credit',
          balanceAfter: 5850.75,
        },
        {
          id: 3,
          date: new Date('2024-05-03T09:15:00Z').toISOString(),
          description: 'Electric Bill',
          amount: 85.50,
          type: 'debit',
          balanceAfter: 5765.25,
        },
        {
          id: 4,
          date: new Date('2024-05-04T18:45:00Z').toISOString(),
          description: 'Restaurant',
          amount: 45.00,
          type: 'debit',
          balanceAfter: 5720.25,
        },
        {
          id: 5,
          date: new Date('2024-05-05T11:20:00Z').toISOString(),
          description: 'Online Shopping',
          amount: 120.99,
          type: 'debit',
          balanceAfter: 5599.26,
        },
        {
          id: 6,
          date: new Date('2024-05-06T08:00:00Z').toISOString(),
          description: 'Gym Membership',
          amount: 50.00,
          type: 'debit',
          balanceAfter: 5549.26,
        },
        {
          id: 7,
          date: new Date('2024-05-07T16:10:00Z').toISOString(),
          description: 'Coffee Shop',
          amount: 4.50,
          type: 'debit',
          balanceAfter: 5544.76,
        },
        {
          id: 8,
          date: new Date('2024-05-08T13:40:00Z').toISOString(),
          description: 'Refund',
          amount: 25.00,
          type: 'credit',
          balanceAfter: 5569.76,
        },
        {
          id: 9,
          date: new Date('2024-05-09T19:00:00Z').toISOString(),
          description: 'Movie Tickets',
          amount: 30.00,
          type: 'debit',
          balanceAfter: 5539.76,
        },
        {
          id: 10,
          date: new Date('2024-05-10T12:00:00Z').toISOString(),
          description: 'Gas Station',
          amount: 40.00,
          type: 'debit',
          balanceAfter: 5499.76,
        },
      ]);
    }, 500); // simulate network delay
  });
};