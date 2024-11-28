export const formatCurrency = (number: number, decimal = true): string => {
  const parts = String(number).split('.');

  const integerPart = (parts[0] ?? '').replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1,',
  );

  if (!decimal) {
    return integerPart;
  }

  let decimalPart = parts[1] || '00';

  decimalPart = decimalPart.padEnd(2, '0').slice(0, 2);

  return `${integerPart}.${decimalPart}`;
};
