import * as Router from 'koa-router';

import { jwtGuard } from './jwt';

import authRouter from './modules/auth';
import registrationRequestRouter from './modules/admin';
import personRouter from './modules/person';
import groupRouter from './modules/group';

export const routes = new Router()
  .get('/', async ctx => ctx.body = 'OK')
  .use('/', authRouter.routes(), authRouter.allowedMethods())
  .use('/', registrationRequestRouter.routes(), registrationRequestRouter.allowedMethods())
  .use('/', jwtGuard, personRouter.routes(), personRouter.allowedMethods())
  .use('/', jwtGuard, groupRouter.routes(), groupRouter.allowedMethods())
  .routes();
