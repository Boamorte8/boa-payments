import { rest } from 'msw';

import { endpoints } from '@app/config';

const getOrdersEndpoint = endpoints
  .getOrders('userIdTest', 'tokenTest')
  .split('?')[0];

const handlers = [
  rest.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    (req, res, ctx) => {
      const isAuthenticated = sessionStorage.getItem('is-authenticated');
      if (!isAuthenticated) {
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'Not authorized',
          })
        );
      }
      return res(
        ctx.status(200),
        ctx.json({
          idToken: 'idTokenTest',
          localId: 'localIdTest',
          expiresIn: 500,
        })
      );
    }
  ),
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
];

export { handlers };
