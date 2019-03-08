import { ObjectId } from 'mongodb';
import _ = require('lodash');

import { Context } from '../../models/common';
import { Group } from '../../models/group';

import {
  GROUPS,
  PERSONS,
  TELEGRAM_CHANNELS,
  VIBER_GROUPS
} from '../../models/collections';

import {
  CreateGroupRequest,
  CreateGroupResponse,
  UpdateGroupRequest
} from './models';

export const get = async (ctx: Context) => {

  const pipeline = [
    {
      $lookup: {
        from: TELEGRAM_CHANNELS,
        localField: 'telegramChannels',
        foreignField: '_id',
        as: 'telegramChannels',
      }
    },
    {
      $lookup: {
        from: PERSONS,
        localField: 'persons',
        foreignField: '_id',
        as: 'persons',
      }
    },
    {
      $lookup: {
        from: VIBER_GROUPS,
        localField: 'viberGroups',
        foreignField: '_id',
        as: 'viberGroups',
      }
    },
  ];

  const groups: Group[] = await ctx.db.collection(GROUPS).aggregate(pipeline).toArray();
  ctx.body = { data: groups };
};

export const getById = async (ctx: Context) => {

  const pipeline = [
    { $match: { _id: new ObjectId(ctx.params.id) } },
    {
      $lookup: {
        from: PERSONS,
        localField: 'persons',
        foreignField: '_id',
        as: 'persons',
      }
    },
    {
      $lookup: {
        from: TELEGRAM_CHANNELS,
        localField: 'telegramChannels',
        foreignField: '_id',
        as: 'telegramChannels',
      }
    },
    {
      $lookup: {
        from: VIBER_GROUPS,
        localField: 'viberGroups',
        foreignField: '_id',
        as: 'viberGroups',
      }
    },
  ];

  const group: Group[] = await ctx.db.collection(GROUPS).aggregate(pipeline).toArray();

  if (!group.length) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, group with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { data: group[0] };
};

export const create = async (ctx: Context) => {

  const requestBody: CreateGroupRequest = ctx.request.body;
  const newGroup = <any>requestBody;

  if (requestBody.persons) {
    newGroup.persons = _.map(requestBody.persons, (person: string) => new ObjectId(person));
  }

  if (requestBody.telegramChannels) {
    newGroup.telegramChannels = _.map(requestBody.telegramChannels, (channel: string) => new ObjectId(channel));
  }

  if (requestBody.viberGroups) {
    newGroup.viberGroups = _.map(requestBody.viberGroups, (group: string) => new ObjectId(group));
  }

  const group = await ctx.db.collection(GROUPS).insertOne(newGroup);

  const responseData: CreateGroupResponse = {
    groupId: group.insertedId
  };

  ctx.status = 201;
  ctx.body = {
    data: responseData,
    message: 'Success! Group has been created.'
  };
};

export const update = async (ctx: Context) => {

  const requestBody: UpdateGroupRequest = ctx.request.body;
  const newGroup = <any>requestBody;

  if (requestBody.persons) {
    newGroup.persons = _.map(requestBody.persons, (person: string) => new ObjectId(person));
  }

  if (requestBody.telegramChannels) {
    newGroup.telegramChannels = _.map(requestBody.telegramChannels, (channel: string) => new ObjectId(channel));
  }

  if (requestBody.viberGroups) {
    newGroup.viberGroups = _.map(requestBody.viberGroups, (group: string) => new ObjectId(group));
  }

  const query = { _id: new ObjectId(ctx.params.id) };
  const group = await ctx.db.collection(GROUPS).updateOne(query, { $set: newGroup });

  if (!group) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, group with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Group has been updated.' };
};

export const del = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const group = await ctx.db.collection(GROUPS).deleteOne(query);

  if (!group) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, group with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Group has been deleted.' };
};
