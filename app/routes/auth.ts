import * as Router from 'koa-router';

import {
  registrationRequest,
  registrationRequestValidator
} from '../services/auth/registration';
import {
  loginRequestValidator,
  loginRequest
} from '../services/auth/login';

const router = new Router();

router.post('/login', loginRequestValidator, loginRequest);

router.post('/registration', registrationRequestValidator, registrationRequest);

export default router;
