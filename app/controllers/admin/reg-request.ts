import { ObjectId } from 'mongodb';
import * as _ from 'lodash';

import * as util from '../../util';
import { Context } from '../../models/common';
import { REGISTRATION_REQUESTS, USERS } from '../../models/collections';
import { RegistrationRequest } from '../../models/auth';
import { sendMessage } from '../../services/email';
import {
  registrationReqRejectMail,
  registrationReqAcceptMail
} from '../../templates/email/reqistration';

export const getRegistrationRequests = async (ctx: Context) => {
  ctx.body = { data: await ctx.db.collection(REGISTRATION_REQUESTS).find().toArray() };
};

export const getRegistrationRequestById = async (ctx: Context) => {

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

export const resolveRegistrationRequest = async (ctx: Context) => {

  const { id, accept } = ctx.request.body;

  const query = { _id: new ObjectId(id) };
  const regReq: RegistrationRequest = await ctx.db.collection(REGISTRATION_REQUESTS).findOne(query);

  if (!regReq) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, registration request id is wrong.' };
    return;
  }

  await ctx.db.collection(REGISTRATION_REQUESTS).deleteOne(query);

  if (Boolean(accept)) {
    await ctx.db.collection(USERS).insertOne(util.exceptMongoId(regReq));
    sendMessage({
      to: regReq.email,
      subject: 'Вітаємо! Ваша заявка на реєстрацію прийнята.',
      html: registrationReqAcceptMail(regReq.firstname, regReq.lastname).html,
      text: registrationReqAcceptMail(regReq.firstname, regReq.lastname).text
    });
  } else {
    sendMessage({
      to: regReq.email,
      subject: 'На жаль, ваш запит на реєстрацію відхилено.',
      html: registrationReqRejectMail(regReq.firstname, regReq.lastname).html,
      text: registrationReqRejectMail(regReq.firstname, regReq.lastname).text
    });
  }

  const message = Boolean(accept)
    ? 'Success! Registration request has been accepted.'
    : 'Success! Registration request has been rejected.';

  ctx.status = 200;
  ctx.body = { message };
};
