import * as Router from 'koa-router';

import { jwtGuard } from './jwt';

import authRouter from './modules/auth';
import registrationRequestRouter from './modules/admin';
import personRouter from './modules/person';
import groupRouter from './modules/group';
import tgChannelRouter from './modules/tg-channel';
import viberGroupRouter from './modules/viber-group';

export const routes = new Router()
  .get('/', async ctx => ctx.body = 'OK')
  .use('/', authRouter.routes(), authRouter.allowedMethods())
  .use('/', registrationRequestRouter.routes(), registrationRequestRouter.allowedMethods())
  .use('/', jwtGuard, personRouter.routes(), personRouter.allowedMethods())
  .use('/', jwtGuard, groupRouter.routes(), groupRouter.allowedMethods())
  .use('/', jwtGuard, tgChannelRouter.routes(), tgChannelRouter.allowedMethods())
  .use('/', jwtGuard, viberGroupRouter.routes(), viberGroupRouter.allowedMethods())
  .routes();
