import { Length, IsEmail, IsNotEmpty } from 'class-validator';
import { trim } from '../../../utils';

export class RegistrationRequest {

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  firstname: string;

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  lastname: string;

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  @Length(4, 20, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  username: string;

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  @IsEmail({}, { message: 'Sorry, email is invalid.' })
  email: string;

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
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




