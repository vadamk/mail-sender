import * as Router from 'koa-router';
import { createValidator } from '../../utils';

import {
  loginRequest,
  registrationRequest
} from './controllers';

import {
  LoginRequest,
  RegistrationRequest
} from './models';

export const router = new Router()
  .post('auth/login', createValidator(LoginRequest), loginRequest)
  .post('auth/registration', createValidator(RegistrationRequest), registrationRequest);
