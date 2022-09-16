import { type GeneralObject } from '@app/models';

export const generateId = (): number => Math.random() * Date.now();

export const formatCurrency = (
  value: string | number,
  currency: string
): string =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(+value);

export const formatDate = (value: Date): string =>
  new Intl.DateTimeFormat('en-US').format(value);

export const filterByProperty = <T>(
  collection: T[],
  property: string,
  search: string
): T[] => {
  return collection.filter((item: T) => {
    let value = (item as unknown as GeneralObject)[property];
    if (typeof value === 'number') {
      value = value.toString();
    }
    return (value as string).toLowerCase().includes(search);
  });
};
