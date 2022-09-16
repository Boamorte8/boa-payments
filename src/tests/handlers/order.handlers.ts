import { rest } from 'msw';

import { endpoints } from '@app/config';

const getOrdersEndpoint = endpoints
  .getOrders('userIdTest', 'tokenTest')
  .split('?')[0];

export const orderHandlers = [
  rest.get(getOrdersEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error loading order list',
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        '0000': {},
        '0001': {},
      })
    );
  }),
  rest.post(getOrdersEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error saving order',
        })
      );
    }
    return res(ctx.status(200), ctx.json({ name: '12345' }));
  }),
  rest.put(getOrdersEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error saving order',
        })
      );
    }
    return res(ctx.status(200), ctx.json({ name: '12345' }));
  }),
];
