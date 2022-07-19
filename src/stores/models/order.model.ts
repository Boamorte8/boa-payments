import type { BaseSelectItem } from '@app/models';
import type { Category } from './category.model';
import type { CurrencyValue } from './currency.model';
import type { Entity } from './entity.model';

export enum OrderType {
  LOAN = 'LOAN',
  DEBT = 'DEBT',
}

export const orderTypes: BaseSelectItem[] = [
  { text: 'loan', value: OrderType.LOAN },
  { text: 'debt', value: OrderType.DEBT },
];

export interface Order {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: CurrencyValue;
  entity: Entity;
  type: OrderType;
  category: Category[] | { [key: string]: Category };
  finished: boolean;
  subscription: boolean;
  startDate: string;
  nextDate: string;
}

export interface OrderState {
  orders: Order[];
  loaded: boolean;
  loading: boolean;
  saving: boolean;
}
