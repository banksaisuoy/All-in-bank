import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { vi } from 'vitest';

// Mock Recharts to avoid issues with ResponsiveContainer in jsdom
vi.mock('recharts', async (importOriginal) => {
  const OriginalRecharts = await importOriginal<typeof import('recharts')>();
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    ),
  };
});

const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is no longer supported in React 18')
  ) {
    return;
  }
  originalError.call(console, ...args);
};
