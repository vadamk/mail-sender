import { Validator, validate } from 'class-validator';
import _ = require('lodash');
import { Middleware } from 'koa';
import { Context } from '../models/common';

export const isMongoId = (id: string): boolean => {
  const validator = new Validator();
  return validator.isMongoId(id);
};

export const createValidator = (classValidator: any): Middleware => {
  return async (ctx: Context, next: Function) => {

    const errors = await validate(
      _.assign(new classValidator, ctx.request.body),
      {
        validationError: { target: false },
        whitelist: true,
        forbidNonWhitelisted: true
      }
    );

    if (!!errors.length) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }

    await next();
  };
};
