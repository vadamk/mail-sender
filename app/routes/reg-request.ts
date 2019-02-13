import * as Router from 'koa-router';
import {
  getRegistrationRequests,
  getRegistrationRequestById,
  resolveRegistrationRequest,
} from '../controllers/admin/reg-request';

import {
  validateResolveRegistrationRequest,
  validateGetRegistrationRequestById
} from '../validators/admin';

export const regRequestRouter = new Router()
  .get('registration-requests/', getRegistrationRequests)
  .get('registration-requests/:id', validateGetRegistrationRequestById, getRegistrationRequestById)
  .post('registration-requests/', validateResolveRegistrationRequest, resolveRegistrationRequest);

