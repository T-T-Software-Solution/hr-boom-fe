import { formatCurrency } from './number';

describe('formatCurrency', () => {
  it('should format number with commas and 2 decimal places by default', () => {
    expect(formatCurrency(1234.5)).toBe('1,234.50');
    expect(formatCurrency(123456789.987)).toBe('123,456,789.98');
    expect(formatCurrency(1000000)).toBe('1,000,000.00');
  });

  it('should format number with commas and without decimals if decimal=false', () => {
    expect(formatCurrency(1234.5, false)).toBe('1,234');
    expect(formatCurrency(123456789.987, false)).toBe('123,456,789');
    expect(formatCurrency(1000000, false)).toBe('1,000,000');
  });

  it('should handle small numbers with 2 decimal places', () => {
    expect(formatCurrency(12)).toBe('12.00');
    expect(formatCurrency(12.34)).toBe('12.34');
    expect(formatCurrency(12.3456)).toBe('12.34');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-1,234.56');
    expect(formatCurrency(-9876543.21)).toBe('-9,876,543.21');
  });

  it('should handle large numbers without decimals', () => {
    expect(formatCurrency(9876543210, false)).toBe('9,876,543,210');
  });

  it('should add padding to decimal places when missing', () => {
    expect(formatCurrency(100.1)).toBe('100.10');
    expect(formatCurrency(100)).toBe('100.00');
  });
});
