import {
  Length,
} from 'class-validator';

export class CreateViberGroupRequest {

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  name: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  description: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  groupId: string;

}

export class CreateViberGroupResponse {

  groupId: string;

}
