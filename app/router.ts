import * as Router from 'koa-router';

import { jwtGuard } from './jwt';

import {
  authRouter,
  regRequestRouter,
  personRouter
} from './routes';

export const routes = new Router()
  .get('/', async ctx => ctx.body = 'OK')
  .use('/', authRouter.routes(), authRouter.allowedMethods())
  .use('/', regRequestRouter.routes(), regRequestRouter.allowedMethods())
  .use('/', jwtGuard, personRouter.routes(), personRouter.allowedMethods())
  .routes();
