const jwtSecret = require('koa-jwt');

import { sign as jwtSing, SignOptions } from 'jsonwebtoken';

const SECRET = 'some-secret';

export const sign = (
  payload: string | object | Buffer = {},
  options?: SignOptions
) => jwtSing(payload, SECRET, options);

export const jwt = jwtSecret({ secret: SECRET });
