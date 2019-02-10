import { Length, IsEmail } from 'class-validator';

export class RegistrationRequest {

  @Length(6, 32, {
    message: 'Sorry, your firstname must be between $constraint1 and $constraint2 characters long.'
  })
  firstname: string;

  @Length(6, 32, {
    message: 'Sorry, your lastname must be between $constraint1 and $constraint2 characters long.'
  })
  lastname: string;

  @Length(4, 20, {
    message: 'Sorry, your username must be between $constraint1 and $constraint2 characters long.'
  })
  username: string;

  @IsEmail({}, {
    message: 'Sorry, your email is invalid.'
  })
  email: string;

  @Length(6, 32, {
    message: 'Use 8 characters or more for your password'
  })
  password: string;

}




