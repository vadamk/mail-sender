import * as Router from 'koa-router';
import { createValidator } from '../../utils';

import {
  getRegistrationRequests,
  getRegistrationRequestById,
  resolveRegistrationRequest,
} from './controllers';

import { ResolveRegistrationRequest } from './models';

export const router = new Router()
  .get('registration-requests/', getRegistrationRequests)
  .get('registration-requests/:id', getRegistrationRequestById)
  .post('registration-requests/', createValidator(ResolveRegistrationRequest), resolveRegistrationRequest);

