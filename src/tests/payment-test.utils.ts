import { mockOrders } from './order-test.utils';
import type { Payment } from '../stores/models';

export const mockPayments: Payment[] = [
  {
    id: '12340',
    title: 'Test Title 0',
    description: 'Test description payment 0',
    amount: 10000,
    payDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
    order: mockOrders[0],
  },
  {
    id: '12341',
    title: 'Test Title 1',
    description: 'Test description payment 1',
    amount: 20000,
    payDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
    order: mockOrders[0],
  },
  {
    id: '12342',
    title: 'Test Title 2',
    description: 'Test description payment 2',
    amount: 30000,
    payDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
    order: mockOrders[0],
  },
  {
    id: '12343',
    title: 'Test Title 3',
    description: 'Test description payment 3',
    amount: 40000,
    payDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
    order: mockOrders[0],
  },
];
