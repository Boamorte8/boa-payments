export const generateId = (): number => Math.random() * Date.now();

export const formatCurrency = (
  value: string | number,
  currency: string
): string =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    currencyDisplay: 'narrowSymbol',
  }).format(+value);

export const formatDate = (value: Date): string =>
  new Intl.DateTimeFormat('en-US').format(value);
