import { rest } from 'msw';

const handlers = [
  rest.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),
];

export { handlers };
