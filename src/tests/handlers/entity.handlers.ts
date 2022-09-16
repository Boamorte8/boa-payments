import { rest } from 'msw';

import { endpoints } from '@app/config';

const getEntitiesEndpoint = endpoints
  .getEntities('userIdTest', 'tokenTest')
  .split('?')[0];

export const entityHandlers = [
  rest.get(getEntitiesEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error loading entities',
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
  rest.post(getEntitiesEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error saving entity',
        })
      );
    }
    return res(ctx.status(200), ctx.json({ name: '12345' }));
  }),
];
