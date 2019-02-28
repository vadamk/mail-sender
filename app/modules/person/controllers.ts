import { ObjectId } from 'mongodb';
import { Context } from '../../models/common';
import { PERSONS } from '../../models/collections';

import {
  CreatePersonRequest,
  CreatePersonResponse,
  UpdatePersonRequest
} from './models';

export const getPersons = async (ctx: Context) => {
  ctx.body = {
    data: await ctx.db.collection(PERSONS).find().toArray()
  };
};

export const getPersonById = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const person = await ctx.db.collection(PERSONS).findOne(query);

  if (!person) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, person with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { data: person };
};

export const createPerson = async (ctx: Context) => {

  const requestBody: CreatePersonRequest = ctx.request.body;

  const person = await ctx.db.collection(PERSONS).insertOne(requestBody);

  if (!person) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, person with this id was not found.' };
    return;
  }

  const responseData: CreatePersonResponse = {
    personId: person.insertedId
  };

  ctx.status = 201;
  ctx.body = {
    data: responseData,
    message: 'Success! Person has been created.'
  };
};

export const updatePerson = async (ctx: Context) => {

  const requestBody: UpdatePersonRequest = ctx.request.body;

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

export const deletePerson = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const person = await ctx.db.collection(PERSONS).deleteOne(query);

  if (!person) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, person with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Person has been updated.' };
};
