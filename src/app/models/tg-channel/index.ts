import { ObjectId } from 'mongodb';

export class TelegramChannel {

  _id: ObjectId;

  name: string;

  description: string;

  channelId: string;

}
