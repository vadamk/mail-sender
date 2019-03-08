import * as Router from 'koa-router';

import { createValidator } from '../../utils';

import { CreatePersonRequest, UpdatePersonRequest } from './models';

import {
  get,
  getById,
  create,
  update,
  del,
} from './controllers';

export const router = new Router()
  .get('persons/', get)
  .get('persons/:id', getById)
  .post('persons/', createValidator(CreatePersonRequest), create)
  .patch('persons/:id', createValidator(UpdatePersonRequest), update)
  .del('persons/:id', del);
