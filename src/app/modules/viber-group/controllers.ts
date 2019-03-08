import { ObjectId } from 'mongodb';
import { Context } from '../../models/common';
import { VIBER_GROUPS } from '../../models/collections';

import {
  CreateViberGroupRequest,
  CreateViberGroupResponse
} from './models';
import { ViberGroup } from '../../models/viber-group';

export const get = async (ctx: Context) => {
  const groups: ViberGroup[] = await ctx.db.collection(VIBER_GROUPS).find().toArray();
  ctx.body = { data: groups };
};

export const getById = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const group: ViberGroup = await ctx.db.collection(VIBER_GROUPS).findOne(query);

  if (!group) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, group with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { data: group };
};

export const create = async (ctx: Context) => {

  const requestBody: CreateViberGroupRequest = ctx.request.body;
  const query = { groupId: requestBody.groupId };
  const group = await ctx.db.collection(VIBER_GROUPS).find(query).toArray();

  if (group.length) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this group already exists.' };
    return;
  }

  const newGroup = await ctx.db.collection(VIBER_GROUPS).insertOne(requestBody);

  const responseData: CreateViberGroupResponse = {
    groupId: newGroup.groupId
  };

  ctx.status = 201;
  ctx.body = {
    data: responseData,
    message: 'Success! Group has been created.'
  };
};

export const update = async (ctx: Context) => {

  const requestBody: CreateViberGroupRequest = ctx.request.body;

  const groupIdQuery = { groupId: requestBody.groupId };
  const group = await ctx.db.collection(VIBER_GROUPS).find(groupIdQuery).toArray();

  if (group.length) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this groupId already exists.' };
    return;
  }

  const query = { _id: new ObjectId(ctx.params.id) };
  const newGroup = await ctx.db.collection(VIBER_GROUPS).updateOne(query, { $set: requestBody });

  if (!newGroup) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, group with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Group has been updated.' };
};

export const del = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const group = await ctx.db.collection(VIBER_GROUPS).deleteOne(query);

  if (!group) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, group with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Group has been deleted.' };
};
