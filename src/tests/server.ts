import { afterAll, afterEach, beforeAll } from 'vitest';
import { fetch } from 'cross-fetch';
import { setupServer } from 'msw/node';

import { authHandlers } from './handlers/auth.handlers';
import { categoryHandlers } from './handlers/category.handlers';
import { entityHandlers } from './handlers/entity.handlers';
import { orderHandlers } from './handlers/order.handlers';
import { paymentHandlers } from './handlers/payment.handlers';

export const handlers = [
  ...authHandlers,
  ...categoryHandlers,
  ...entityHandlers,
  ...orderHandlers,
  ...paymentHandlers,
];

export const server = setupServer(...handlers);

global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
