import { ObjectId } from 'mongodb';
import { Context } from '../../models/common';
import { TELEGRAM_CHANNELS } from '../../models/collections';

import {
  CreateTgChannelRequest,
  CreateTgChannelResponse
} from './models';
import { TelegramChannel } from '../../models/tg-channel';

export const get = async (ctx: Context) => {
  const channels: TelegramChannel[] = await ctx.db.collection(TELEGRAM_CHANNELS).find().toArray();
  ctx.body = { data: channels };
};

export const getById = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const channel: TelegramChannel = await ctx.db.collection(TELEGRAM_CHANNELS).findOne(query);

  if (!channel) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, channel with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { data: channel };
};

export const create = async (ctx: Context) => {

  const requestBody: CreateTgChannelRequest = ctx.request.body;
  const query = { channelId: requestBody.channelId };
  const channel = await ctx.db.collection(TELEGRAM_CHANNELS).find(query).toArray();

  if (channel.length) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this channel already exists.' };
    return;
  }

  const newChannel = await ctx.db.collection(TELEGRAM_CHANNELS).insertOne(requestBody);

  const responseData: CreateTgChannelResponse = {
    channelId: newChannel.channelId
  };

  ctx.status = 201;
  ctx.body = {
    data: responseData,
    message: 'Success! Channel has been created.'
  };
};

export const update = async (ctx: Context) => {

  const requestBody: CreateTgChannelRequest = ctx.request.body;

  const channelIdQuery = { channelId: requestBody.channelId };
  const channel = await ctx.db.collection(TELEGRAM_CHANNELS).find(channelIdQuery).toArray();

  if (channel.length) {
    ctx.status = 400;
    ctx.body = { message: 'Sorry, this channelId already exists.' };
    return;
  }

  const query = { _id: new ObjectId(ctx.params.id) };
  const newChannel = await ctx.db.collection(TELEGRAM_CHANNELS).updateOne(query, { $set: requestBody });

  if (!newChannel) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, channel with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Channel has been updated.' };
};

export const del = async (ctx: Context) => {

  const query = { _id: new ObjectId(ctx.params.id) };
  const channel = await ctx.db.collection(TELEGRAM_CHANNELS).deleteOne(query);

  if (!channel) {
    ctx.status = 404;
    ctx.body = { message: 'Sory, channel with this id was not found.' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Success! Channel has been deleted.' };
};
