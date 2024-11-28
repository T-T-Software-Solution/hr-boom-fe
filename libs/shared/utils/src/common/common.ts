import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const cleanSearchParams = (params: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      value === null || value === '' ? undefined : value,
    ]),
  );
};
