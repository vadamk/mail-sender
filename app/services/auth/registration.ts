import { validate } from 'class-validator';
import { REGISTRATION_REQUEST } from '../../models/collections';
import { RegistrationRequest } from '../../models/auth';
import { Context } from '../../models/common';

export const registrationRequestValidator = async (ctx: Context, next: Function) => {

  const model = new RegistrationRequest();

  model.firstname = ctx.request.body.firstname.trim();
  model.lastname = ctx.request.body.lastname.trim();
  model.username = ctx.request.body.username.trim();
  model.email = ctx.request.body.email.trim();
  model.password = ctx.request.body.password.trim();

  const errors = await validate(model);

  if (!!errors.length) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  await next();
};

export const registrationRequest = async (ctx: Context) => {

  const model: RegistrationRequest = ctx.request.body;

  const collection = await ctx.db.collection(REGISTRATION_REQUEST);
  const users = await collection.find({ 'email': model.email }).toArray();

  if (!users.length) {
    await ctx.db.collection(REGISTRATION_REQUEST).insertOne(model);
    ctx.status = 201;
    ctx.body = { message: 'Registration request has been created. Please wait for approving.' };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already using.' };
  }
};
