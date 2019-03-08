import * as Router from 'koa-router';

import { createValidator } from '../../utils';

import {
  CreateViberGroupRequest,
  UpdateViberGroupRequest
} from './models';

import {
  get,
  getById,
  create,
  update,
  del,
} from './controllers';

export const router = new Router()
  .get('viber-groups/', get)
  .get('viber-groups/:id', getById)
  .post('viber-groups/', createValidator(CreateViberGroupRequest), create)
  .patch('viber-groups/:id', createValidator(UpdateViberGroupRequest), update)
  .del('viber-groups/:id', del);
