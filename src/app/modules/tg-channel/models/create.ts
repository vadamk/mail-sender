import {
  Length,
} from 'class-validator';

export class CreateTgChannelRequest {

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  name: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  description: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  channelId: string;

}

export class CreateTgChannelResponse {

  channelId: string;

}
