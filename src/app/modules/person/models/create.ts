import {
  Length,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreatePersonRequest {

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  firstName: string;

  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  lastName: string;

  @IsEmail({}, { message: 'Sorry, email is invalid.' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('UA', { message: 'Sorry, phone is invalid.' })
  phoneNumber?: string;

  @IsBoolean({ message: 'Sorry, $property is not boolean.' })
  isMember: boolean;

}

export class CreatePersonResponse {

  personId: string;

}
