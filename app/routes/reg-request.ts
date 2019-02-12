import * as Router from 'koa-router';
import {
  getRegistrationRequests,
  getRegistrationRequestById,
  resolveRegistrationRequest,
} from '../controllers/admin/reg-request';

import {
  validateResolveRegistrationRequest,
  getRegistrationRequestByIdValidator
} from '../validators/admin/reg-request';

export default new Router()
  .get('/', getRegistrationRequests)
  .get('/:id', getRegistrationRequestByIdValidator, getRegistrationRequestById)
  .post('/', validateResolveRegistrationRequest, resolveRegistrationRequest);

