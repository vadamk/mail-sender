import * as Router from 'koa-router';

import { loginRequest } from '../controllers/auth/login';
import { registrationRequest } from '../controllers/auth/registration';

import {
  validateLoginRequest,
  validateRegistrationRequest
} from '../validators/auth';

export const authRouter = new Router()
  .post('auth/login', validateLoginRequest, loginRequest)
  .post('auth/registration', validateRegistrationRequest, registrationRequest);

