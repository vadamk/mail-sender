import { validate } from 'class-validator';
import * as _ from 'lodash';
import { hash } from 'bcrypt';

import { config } from '../../config';
import { REGISTRATION_REQUESTS, USERS } from '../../models/collections';
import { RegistrationRequest } from '../../models/auth';
import { Context } from '../../models/common';

export const registrationRequestValidator = async (ctx: Context, next: Function) => {

  const errors = await validate(
    RegistrationRequest.from(ctx.request.body),
    { validationError: { target: false } }
  );

  if (!!errors.length) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  await next();
};

export const registrationRequest = async (ctx: Context) => {

  const reqBody: RegistrationRequest = ctx.request.body;

  const query = { 'email': reqBody.email };
  const user = await ctx.db.collection(REGISTRATION_REQUESTS).findOne(query);
  const regRequest = await ctx.db.collection(USERS).findOne(query);

  if (!user && !regRequest) {
    reqBody.password = await hash(reqBody.password, config.saltRounds);

    await ctx.db.collection(REGISTRATION_REQUESTS).insertOne(reqBody);
    ctx.status = 201;
    ctx.body = { message: 'Success! Registration request has been created. Please wait for approving.' };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already using.' };
  }
};
