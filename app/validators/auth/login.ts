import { validate } from 'class-validator';
import { Context } from '../../models/common';
import { LoginRequest } from '../../models/auth/login';

export const loginRequestValidator = async (ctx: Context, next: Function) => {

  const errors = await validate(
    LoginRequest.from(ctx.request.body),
    { validationError: { target: false } }
  );

  if (!!errors.length) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  await next();
};
