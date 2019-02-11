import * as Router from 'koa-router';
import {
  getRegistrationRequests,
  getRegistrationRequestById,
  resolveRegistrationRequest,
  validateResolveRegistrationRequest
} from '../services/reg-request';


const router = new Router();

router.get('/', getRegistrationRequests);

router.get('/:id', getRegistrationRequestById);

router.post('/', validateResolveRegistrationRequest, resolveRegistrationRequest);

export default router;
