import { authRouter } from './auth';
import { regRequestRouter } from './reg-request';
import { personRouter } from './person';

import * as Router from 'koa-router';

import { jwtGuard } from '../jwt';

export const routes = new Router()
  .get('/', async ctx => ctx.body = 'OK')
  .use('/', authRouter.routes(), authRouter.allowedMethods())
  .use('/', regRequestRouter.routes(), regRequestRouter.allowedMethods())
  .use('/', jwtGuard, personRouter.routes(), personRouter.allowedMethods())
  .routes();
