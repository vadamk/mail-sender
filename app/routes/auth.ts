import * as Router from 'koa-router';

import {
  registrationRequest,
  registrationRequestValidator
} from '../controllers/auth/registration';
import {
  loginRequestValidator,
  loginRequest
} from '../controllers/auth/login';

const router = new Router();

router.post('/login', loginRequestValidator, loginRequest);

router.post('/registration', registrationRequestValidator, registrationRequest);

export default router;
