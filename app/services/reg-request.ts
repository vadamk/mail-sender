import { ObjectId } from 'mongodb';
import { validate } from 'class-validator';
import * as _ from 'lodash';

import * as util from '../util';
import { Context } from '../models/common';
import { REGISTRATION_REQUESTS, USERS } from '../models/collections';
import { ResolveRegistrationRequest } from '../models/reg-request';

export const getRegistrationRequests = async (ctx: Context) => {
  ctx.body = { data: await ctx.db.collection(REGISTRATION_REQUESTS).find().toArray() };
};

export const getRegistrationRequestById = async (ctx: Context) => {

  if (!util.isMongoId(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = { message: 'Success! Registration request id is wrong.' };
    return;
  }

  const query = { _id: new ObjectId(ctx.params.id) };
  const regReq = await ctx.db.collection(REGISTRATION_REQUESTS).findOne(query);

  if (!regReq) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, registration request with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { data: regReq };
};

export const validateResolveRegistrationRequest = async (ctx: Context, next: Function) => {

  const errors = await validate(
    ResolveRegistrationRequest.from(ctx.request.body),
    { validationError: { target: false } }
  );

  if (!!errors.length) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  await next();
};

export const resolveRegistrationRequest = async (ctx: Context) => {

  const { id, accept } = ctx.request.body;

  const query = { _id: new ObjectId(id) };
  const regReq = await ctx.db.collection(REGISTRATION_REQUESTS).findOne(query);
  await ctx.db.collection(REGISTRATION_REQUESTS).deleteOne(query);

  let message;

  if (Boolean(accept)) {
    await ctx.db.collection(USERS).insertOne(util.exceptMongoId(regReq));
    message = 'Success! Registration request has been accepted.';
  } else {
    message = 'Success! Registration request has been rejected.';
  }

  ctx.status = 200;
  ctx.body = { message };
};
