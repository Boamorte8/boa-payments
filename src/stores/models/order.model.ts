import type { BaseSelectItem, SortValue } from '@app/models';
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
  currentAmount: number;
  currency: CurrencyValue;
  entity: Entity;
  type: OrderType;
  category: Category[];
  finished: boolean;
  subscription: boolean;
  startDate: string;
  nextDate: string;
}

export type OrderKey = keyof Order;

export interface OrderState {
  allOrders: Order[];
  orders: Order[];
  loaded: boolean;
  loading: boolean;
  saving: boolean;
  updating: boolean;
  sortBy: SortValue;
}
