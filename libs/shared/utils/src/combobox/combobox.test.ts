import { describe, it, expect } from 'vitest';
import { getComboboxData } from './combobox';

describe('getComboboxData', () => {
  it('should convert array of objects to ComboboxData format', () => {
    // Arrange
    const mockData = [
      { id: 1, name: 'Cat', type: 'animal' },
      { id: 2, name: 'Dog', type: 'animal' },
    ];

    // Act
    const result = getComboboxData(mockData, 'id', 'name');

    // Assert
    expect(result).toEqual([
      { value: '1', label: 'Cat' },
      { value: '2', label: 'Dog' },
    ]);
  });

  it('should handle empty array', () => {
    // Arrange
    const mockData: Array<{ id: number; name: string }> = [];

    // Act
    const result = getComboboxData(mockData, 'id', 'name');

    // Assert
    expect(result).toEqual([]);
  });

  it('should convert non-string values to strings', () => {
    // Arrange
    const mockData = [
      { id: 123, displayName: true },
      { id: 456, displayName: false },
    ];

    // Act
    const result = getComboboxData(mockData, 'id', 'displayName');

    // Assert
    expect(result).toEqual([
      { value: '123', label: 'true' },
      { value: '456', label: 'false' },
    ]);
  });

  it('should handle objects with different property types', () => {
    // Arrange
    const mockData = [
      { code: 'A001', status: 1 },
      { code: 'B002', status: 0 },
    ];

    // Act
    const result = getComboboxData(mockData, 'code', 'status');

    // Assert
    expect(result).toEqual([
      { value: 'A001', label: '1' },
      { value: 'B002', label: '0' },
    ]);
  });
});
