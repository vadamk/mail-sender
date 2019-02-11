import { validate } from 'class-validator';
import * as _ from 'lodash';

import { REGISTRATION_REQUESTS } from '../../models/collections';
import { RegistrationRequest } from '../../models/auth';
import { Context } from '../../models/common';
import * as util from '../../util';

export const registrationRequestValidator = async (ctx: Context, next: Function) => {

  const errors = await validate(
    RegistrationRequest.from(ctx.request.body),
    { validationError: { target: false } }
  );

  if (!!errors.length) {
    ctx.status = 400;
    ctx.body = _.map(errors, util.errorFormalize);
    return;
  }

  await next();
};

export const registrationRequest = async (ctx: Context) => {

  const model: RegistrationRequest = ctx.request.body;

  const collection = await ctx.db.collection(REGISTRATION_REQUESTS);
  const users = await collection.find({ 'email': model.email }).toArray();

  if (!users.length) {
    await ctx.db.collection(REGISTRATION_REQUESTS).insertOne(model);
    ctx.status = 201;
    ctx.body = { message: 'Success! Registration request has been created. Please wait for approving.' };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already using.' };
  }
};
