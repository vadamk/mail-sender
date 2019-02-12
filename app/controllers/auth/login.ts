import * as _ from 'lodash';
import { compare } from 'bcrypt';

import { sign } from '../../jwt';
import { USERS } from '../../models/collections';
import { LoginRequest } from '../../models/auth';
import { Context } from '../../models/common';

export const loginRequest = async (ctx: Context) => {

  const reqBody: LoginRequest = ctx.request.body;

  const user = await ctx.db.collection(USERS).findOne({ 'email': reqBody.email });
  const verified = await compare(reqBody.password, user.password);

  if (user && verified) {
    ctx.status = 200;
    ctx.body = { token: sign(user) };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, user doen\'t exists or password is wrong.' };
  }
};
