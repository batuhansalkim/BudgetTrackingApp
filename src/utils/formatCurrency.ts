export const formatCurrency = (amount: number, currency: string) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
  });
  
  return formatter.format(amount);
}; 