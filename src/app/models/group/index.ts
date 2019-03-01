import { ObjectId } from 'mongodb';

export class Group {

  _id: ObjectId;

  name: string;

  description: string;

  telegramChanelId: string;

  viberGroupId: string;

  persons: ObjectId[];

}
