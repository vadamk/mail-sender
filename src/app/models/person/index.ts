import { ObjectId } from 'mongodb';

export class Person {

  _id: ObjectId;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  isMember: boolean;

}
