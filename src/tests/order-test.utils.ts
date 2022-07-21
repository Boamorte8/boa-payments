import { mockCategories } from './category-test.utils';
import { mockEntities } from './entity-test.utils';
import { OrderType, type Order } from '../stores/models';

export const mockOrders: Order[] = [
  {
    id: '12340',
    title: 'Test Title 0',
    description: 'Test description order 0',
    amount: 10000,
    currency: 'COP',
    entity: mockEntities[0],
    type: OrderType.LOAN,
    category: [mockCategories[0]],
    finished: false,
    subscription: false,
    startDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
  },
  {
    id: '12341',
    title: 'Test Title 1',
    description: 'Test description order 1',
    amount: 20000,
    currency: 'COP',
    entity: mockEntities[1],
    type: OrderType.LOAN,
    category: [mockCategories[0]],
    finished: false,
    subscription: false,
    startDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
  },
  {
    id: '12342',
    title: 'Test Title 2',
    description: 'Test description order 2',
    amount: 30000,
    currency: 'COP',
    entity: mockEntities[2],
    type: OrderType.LOAN,
    category: [mockCategories[0]],
    finished: false,
    subscription: false,
    startDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
  },
  {
    id: '12343',
    title: 'Test Title 3',
    description: 'Test description order 3',
    amount: 40000,
    currency: 'COP',
    entity: mockEntities[3],
    type: OrderType.LOAN,
    category: [mockCategories[0]],
    finished: false,
    subscription: false,
    startDate: new Date().toISOString(),
    nextDate: new Date().toISOString(),
  },
];