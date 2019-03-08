import * as Router from 'koa-router';

import { createValidator } from '../../utils';

import { CreateGroupRequest, UpdateGroupRequest } from './models';

import {
  get,
  getById,
  create,
  update,
  del,
} from './controllers';

export const router = new Router()
  .get('groups/', get)
  .get('groups/:id', getById)
  .post('groups/', createValidator(CreateGroupRequest), create)
  .patch('groups/:id', createValidator(UpdateGroupRequest), update)
  .del('groups/:id', del);
