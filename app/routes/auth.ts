import * as Router from 'koa-router';
import { sign } from '../jwt';

import {
  registrationRequest,
  registrationRequestValidator
} from '../services/auth/registration';

const router = new Router();

router.get('/login', async ctx => {
  ctx.body = {
    token: sign()
  };
});

router.post(
  '/registration',
  registrationRequestValidator,
  registrationRequest
);

export default router;
