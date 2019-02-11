import * as Router from 'koa-router';

import { jwt } from './jwt';

import Auth from './routes/auth';
import RegistrationRequest from './routes/reg-request';
import Person from './routes/person';

const router = new Router();

/**
 * Basic healthcheck
 */
router.get('/', async ctx => ctx.body = 'OK');

/**
 * Auth
 */
router.use('/auth', Auth.routes(), Auth.allowedMethods());

/**
 * Registration requests
 */
router.use('/registration-requests', RegistrationRequest.routes(), RegistrationRequest.allowedMethods());

/**
 * Person
 */
router.use('/person', jwt, Person.routes(), Person.allowedMethods());

export const routes = router.routes();
