import { rest } from 'msw';

import { endpoints } from '@app/config';

const getPaymentsEndpoint = endpoints
  .getPayments('userIdTest', 'tokenTest')
  .split('?')[0];

export const paymentHandlers = [
  rest.get(getPaymentsEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error loading payment list',
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
  rest.post(getPaymentsEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error saving payment',
        })
      );
    }
    return res(ctx.status(200), ctx.json({ name: '12345' }));
  }),
];
