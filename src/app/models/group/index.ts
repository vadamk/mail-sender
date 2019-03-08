import { ObjectId } from 'mongodb';
import { Person } from '../person';

export class Group {

  _id: ObjectId;

  name: string;

  description: string;

  telegramChannels: string[];

  viberGroups: string[];

  persons: Person[];

}
