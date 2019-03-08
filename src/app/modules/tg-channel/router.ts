import * as Router from 'koa-router';

import { createValidator } from '../../utils';

import {
  CreateTgChannelRequest,
  UpdateTgChannelRequest
} from './models';

import {
  get,
  getById,
  create,
  update,
  del,
} from './controllers';

export const router = new Router()
  .get('tg-channels/', get)
  .get('tg-channels/:id', getById)
  .post('tg-channels/', createValidator(CreateTgChannelRequest), create)
  .patch('tg-channels/:id', createValidator(UpdateTgChannelRequest), update)
  .del('tg-channels/:id', del);
