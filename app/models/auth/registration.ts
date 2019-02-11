import { Length, IsEmail, IsNotEmpty } from 'class-validator';
import * as util from '../../util';

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
    model.firstname = util.trim(json.firstname);
    model.lastname = util.trim(json.lastname);
    model.username = util.trim(json.username);
    model.email = util.trim(json.email);
    model.password = util.trim(json.password);
    return model;
  }

}




