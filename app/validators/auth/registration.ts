import { validate } from 'class-validator';
import { Context } from '../../models/common';
import { RegistrationRequest } from '../../models/auth/registration';

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
