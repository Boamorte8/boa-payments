import { SortValue } from '@app/models';
import type { Order, Payment } from '@stores/models';

export const sortOrders = (orders: Order[], by: SortValue) => {
  const newArray = [...orders];
  if (by === SortValue.OldFirst) {
    return newArray.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  } else if (by === SortValue.NewFirst) {
    return newArray.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
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

export const sortPayments = (payments: Payment[], by: SortValue) => {
  const newArray = [...payments];
  if (by === SortValue.OldFirst) {
    return newArray.sort(
      (a, b) => new Date(b.payDate).getTime() - new Date(a.payDate).getTime()
    );
  } else if (by === SortValue.NewFirst) {
    return newArray.sort(
      (a, b) => new Date(a.payDate).getTime() - new Date(b.payDate).getTime()
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
  return payments;
};
