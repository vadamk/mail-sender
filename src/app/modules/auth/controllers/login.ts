import * as _ from 'lodash';
import { compare } from 'bcrypt';

import { jwtSing } from '../../../jwt';
import { USERS } from '../../../models/collections';
import { LoginRequest } from '../models';
import { Context } from '../../../models';

export const loginRequest = async (ctx: Context) => {

  const reqBody: LoginRequest = ctx.request.body;

  const user = await ctx.db.collection(USERS).findOne({ 'email': reqBody.email });

  if (!!user) {

    const verified = await compare(reqBody.password, user.password);

    if (verified) {
      ctx.status = 200;
      ctx.body = { token: jwtSing(user) };
    } else {
      ctx.status = 400;
      ctx.body = { message: 'Sorry, user doen\'t exists or password is wrong.' };
    }
  }
};
