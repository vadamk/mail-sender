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

  const rrCollection = await ctx.db.collection(REGISTRATION_REQUESTS);
  const uCollection = await ctx.db.collection(USERS);
  const query = { 'email': reqBody.email };
  const users = [await rrCollection.findOne(query), await uCollection.findOne(query)];

  if (!users.length) {
    reqBody.password = await hash(reqBody.password, config.saltRounds);

    await ctx.db.collection(REGISTRATION_REQUESTS).insertOne(reqBody);
    ctx.status = 201;
    ctx.body = { message: 'Success! Registration request has been created. Please wait for approving.' };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already using.' };
  }
};
