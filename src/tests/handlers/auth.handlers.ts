import { rest } from 'msw';

export const authHandlers = [
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
];
