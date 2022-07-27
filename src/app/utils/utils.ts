import { type GeneralObject, SortValue } from '@app/models';
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
  const newArray = [...orders];
  if (by === SortValue.OldFirst) {
    return newArray.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  } else if (by === SortValue.NewFirst) {
    return newArray.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  } else if (by === SortValue.Title) {
    return newArray.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      return 0;
    });
  } else if (by === SortValue.Description) {
    return newArray.sort((a, b) => {
      const descriptionA = a.description.toUpperCase();
      const descriptionB = b.description.toUpperCase();
      if (descriptionA < descriptionB) {
        return -1;
      }
      if (descriptionA > descriptionB) {
        return 1;
      }

      return 0;
    });
  } else if (by === SortValue.SmallestAmounts) {
    return newArray.sort((a, b) => a.amount - b.amount);
  } else if (by === SortValue.LargeAmounts) {
    return newArray.sort((a, b) => b.amount - a.amount);
  }
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
