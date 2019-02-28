import { Validator, validate } from 'class-validator';
import { Context } from '../models/common';

export const isMongoId = (id: string): boolean => {
  const validator = new Validator();
  return validator.isMongoId(id);
};

export const createValidator = (classValidator: any) => {
  return async (ctx: Context, next: Function) => {

    const errors = await validate(
      classValidator.from(ctx.request.body),
      { validationError: { target: false } }
    );

    if (!!errors.length) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }

    await next();
  };
};
