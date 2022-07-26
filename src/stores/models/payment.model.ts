import type { Order } from './order.model';

export interface Payment {
  id: string;
  title: string;
  description: string;
  amount: number;
  order: Order;
  payDate: string;
  nextDate: string;
}

export type PaymentKey = keyof Payment;

export interface PaymentState {
  allPayments: Payment[];
  payments: Payment[];
  loaded: boolean;
  loading: boolean;
  saving: boolean;
}
