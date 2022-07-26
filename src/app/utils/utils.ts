import type { GeneralObject, SortValue } from '@app/models';
import type { Order } from '@stores/models';

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

export const sortOrders = (orders: Order[], by: SortValue) => {
  console.log(by);
  return orders;
};

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
