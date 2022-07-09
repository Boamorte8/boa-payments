export enum OrderType {
  LOAN = 'LOAN',
  DEBT = 'DEBT',
}

export interface Entity {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  title: string;
  description: string;
  amount: number;
  entity: Entity;
  type: OrderType;
  category: Category[];
  finished: boolean;
  subscription: boolean;
  startDate: string;
  nextDate: string;
}

export interface OrderState {
  orders: Order[];
  loaded: boolean;
  loading: boolean;
}
