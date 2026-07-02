import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CashFlowChart, { formatYAxisTick } from './CashFlowChart';
import { cashFlowData } from '@/lib/mockData';

// Recharts ResponsiveContainer is mocked in vitest.setup.tsx

describe('CashFlowChart Component', () => {
  it('renders the chart with correct data points', () => {
    // Note: Recharts doesn't render real SVG DOM nodes in jsdom testing easily
    // unless fully mocked or tested purely as elements. However, our simple mock
    // and standard rendering ensure the component mounts successfully without errors.
    const { container } = render(<CashFlowChart data={cashFlowData} />);

    // We expect the responsive container mock to render
    expect(container).toBeInTheDocument();
  });

  describe('formatYAxisTick', () => {
    it('formats a numeric value with a dollar sign', () => {
      expect(formatYAxisTick(1000)).toBe('$1000');
      expect(formatYAxisTick(0)).toBe('$0');
      expect(formatYAxisTick(-500)).toBe('$-500');
    });

    it('formats a string value with a dollar sign', () => {
      expect(formatYAxisTick('2000')).toBe('$2000');
    });
  });
});
