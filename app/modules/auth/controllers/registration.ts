import * as _ from 'lodash';
import { hash } from 'bcrypt';

import { config } from '../../../config';
import { REGISTRATION_REQUESTS, USERS } from '../../../models/collections';
import { RegistrationRequest } from '../models';
import { Context } from '../../../models/common';
import { sendMessage } from '../../../services/email';
import { thxForRegistrationMail } from '../../../templates/email/reqistration';

export const registrationRequest = async (ctx: Context) => {

  const requestBody: RegistrationRequest = ctx.request.body;

  const query = { 'email': requestBody.email };
  const user = await ctx.db.collection(REGISTRATION_REQUESTS).findOne(query);
  const regRequest = await ctx.db.collection(USERS).findOne(query);

  if (!user && !regRequest) {

    requestBody.password = await hash(requestBody.password, config.saltRounds);

    await ctx.db.collection(REGISTRATION_REQUESTS).insertOne(requestBody);

    sendMessage({
      to: requestBody.email,
      subject: 'Дякуюємо за реєстрацію!',
      html: thxForRegistrationMail(requestBody.firstname, requestBody.lastname).html,
      text: thxForRegistrationMail(requestBody.firstname, requestBody.lastname).text
    });

    ctx.status = 201;
    ctx.body = { message: 'Success! Registration request has been created. Please wait for approving.' };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already using.' };
  }
};
