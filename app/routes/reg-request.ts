import * as Router from 'koa-router';
import {
  getRegistrationRequests,
  getRegistrationRequestById,
  resolveRegistrationRequest,
  validateResolveRegistrationRequest
} from '../controllers/admin/reg-request';


const router = new Router();

router.get('/', getRegistrationRequests);

router.get('/:id', getRegistrationRequestById);

router.post('/', validateResolveRegistrationRequest, resolveRegistrationRequest);

export default router;
