import type { Order } from './order.model';

export interface Payment {
  id: string;
  title: string;
  description: string;
  amount: number;
  order: Order;
  date: string;
}
