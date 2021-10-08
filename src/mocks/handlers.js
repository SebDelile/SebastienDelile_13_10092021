import { rest } from 'msw';

const BASE_URL = 'http://localhost:3001';

export const handlers = [
  // fetchAccountsRequest (call on the root of API to test if any)
  rest.get(BASE_URL + '/', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // loginRequest
  rest.post(BASE_URL + '/api/v1/user/login', (req, res, ctx) => {
    if (req.body.email === '' || req.body.password === '') {
      return res(ctx.status(400), ctx.json(400));
    } else {
      return res(ctx.status(200), ctx.json({ body: { token: 'whatever' } }));
    }
  }),

  // fetchProfileRequest
  rest.post(BASE_URL + '/api/v1/user/profile', (req, res, ctx) => {
    if (!req.headers._headers.authorization) {
      return res(ctx.status(400), ctx.json(400));
    } else {
      return res(
        ctx.status(200),
        ctx.json({ body: { firstName: 'John', lastName: 'Doe' } })
      );
    }
  }),

  // updateProfileRequest
  rest.put(BASE_URL + '/api/v1/user/profile', (req, res, ctx) => {
    if (!req.headers._headers.authorization) {
      return res(ctx.status(400), ctx.json(400));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          body: { firstName: req.body.firstName, lastName: req.body.lastName },
        })
      );
    }
  }),
];
