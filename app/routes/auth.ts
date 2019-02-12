import * as Router from 'koa-router';

import { loginRequest } from '../controllers/auth/login';
import { registrationRequest } from '../controllers/auth/registration';

import {
  loginRequestValidator,
  registrationRequestValidator
} from '../validators/auth';

export default new Router()
  .post('/login', loginRequestValidator, loginRequest)
  .post('/registration', registrationRequestValidator, registrationRequest);

