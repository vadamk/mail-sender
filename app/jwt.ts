const jwtSecret = require('koa-jwt');

import { sign, SignOptions } from 'jsonwebtoken';

const SECRET = 'some-secret';

export const jwtSing = (
  payload: string | object | Buffer = {},
  options?: SignOptions
) => sign(payload, SECRET, options);

export const jwtGuard = jwtSecret({ secret: SECRET });
