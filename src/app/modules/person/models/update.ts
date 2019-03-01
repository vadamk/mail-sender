import { trim } from '../../../utils';
import { Length, IsEmail, IsPhoneNumber, Allow } from 'class-validator';

export class UpdatePersonRequest {

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  firstName: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  lastName: string;

  @IsEmail({}, { message: 'Sorry, email is invalid.' })
  email: string;

  @IsPhoneNumber('UA', { message: 'Sorry, phone is invalid.' })
  phoneNumber: string;

  @Allow()
  isMember: boolean;

  static from(json: any) {
    const model = new UpdatePersonRequest();
    model.firstName = trim(json.firstName);
    model.lastName = trim(json.lastName);
    model.email = trim(json.email);
    model.phoneNumber = trim(json.phoneNumber);
    model.isMember = trim(json.isMember);
    return model;
  }

}
