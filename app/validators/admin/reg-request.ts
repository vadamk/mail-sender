import { validate } from 'class-validator';
import { Context } from '../../models/common';
import { ResolveRegistrationRequest } from '../../models/admin/reg-request';
import * as util from '../../utils';

export const validateGetRegistrationRequestById = async (ctx: Context, next: Function) => {

  if (!util.isMongoId(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = { message: 'Sory, registration request id is wrong.' };
    return;
  }

  await next();
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
