import type { ComboboxData } from '@mantine/core';

/**
 * Get data for Combobox
 * @param data - List of data to be converted
 * @param valueKey - Key of the value
 * @param labelKey - Key of the label
 * @returns ComboboxData
 */
export const getComboboxData = <T extends Record<string, unknown>>(
  data: T[],
  valueKey: keyof T & string,
  labelKey: keyof T & string,
): ComboboxData => {
  return data.map((item) => ({
    value: String(item[valueKey]),
    label: String(item[labelKey]),
  }));
};
