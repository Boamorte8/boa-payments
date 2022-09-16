import { rest } from 'msw';

import { endpoints } from '@app/config';

const getCategoriesEndpoint = endpoints
  .getCategories('userIdTest', 'tokenTest')
  .split('?')[0];

export const categoryHandlers = [
  rest.get(getCategoriesEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error loading categories',
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
  rest.post(getCategoriesEndpoint, (req, res, ctx) => {
    const isWorking = sessionStorage.getItem('is-working');
    if (!isWorking) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Error saving category',
        })
      );
    }
    return res(ctx.status(200), ctx.json({ name: '12345' }));
  }),
];
