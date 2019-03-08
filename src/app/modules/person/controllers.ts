import { ObjectId } from 'mongodb';
import { Context } from '../../models/common';
import { PERSONS } from '../../models/collections';

import {
  CreatePersonRequest,
  CreatePersonResponse,
  UpdatePersonRequest
} from './models';
import { Person } from '../../models/person';

export const get = async (ctx: Context) => {
  const persons: Person[] = await ctx.db.collection(PERSONS).find().toArray();
  ctx.body = { data: persons };
};

export const getById = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const person: Person = await ctx.db.collection(PERSONS).findOne(query);

  if (!person) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, person with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { data: person };
};

export const create = async (ctx: Context) => {

  const requestBody: CreatePersonRequest = ctx.request.body;
  const query = { email: requestBody.email };
  const user = await ctx.db.collection(PERSONS).find(query).toArray();

  if (user.length) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already exists.' };
    return;
  }

  const person = await ctx.db.collection(PERSONS).insertOne(requestBody);

  const responseData: CreatePersonResponse = {
    personId: person.insertedId
  };

  ctx.status = 201;
  ctx.body = {
    data: responseData,
    message: 'Success! Person has been created.'
  };
};

export const update = async (ctx: Context) => {

  const requestBody: UpdatePersonRequest = ctx.request.body;

  const emailQuery = { email: requestBody.email };
  const user = await ctx.db.collection(PERSONS).find(emailQuery).toArray();

  if (user.length) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this email already exists.' };
    return;
  }

  const query = { _id: new ObjectId(ctx.params.id) };
  const person = await ctx.db.collection(PERSONS).updateOne(query, { $set: requestBody });

  if (!person) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, person with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Person has been updated.' };
};

export const del = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const person = await ctx.db.collection(PERSONS).deleteOne(query);

  if (!person) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, person with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Person has been deleted.' };
};
