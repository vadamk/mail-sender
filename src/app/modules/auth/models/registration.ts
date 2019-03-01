import { Length, IsEmail } from 'class-validator';
import { trim } from '../../../utils';

export class RegistrationRequest {

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  firstname: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  lastname: string;

  @Length(4, 20, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  username: string;

  @IsEmail({}, { message: 'Sorry, email is invalid.' })
  email: string;

  @Length(6, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  password: string;

  static from(json: any) {
    const model = new RegistrationRequest();
    model.firstname = trim(json.firstname);
    model.lastname = trim(json.lastname);
    model.username = trim(json.username);
    model.email = trim(json.email);
    model.password = trim(json.password);
    return model;
  }

}




