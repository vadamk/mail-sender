import {
  Length,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class UpdateTgChannelRequest {

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  firstName?: string;

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Sorry, email is invalid.' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('UA', { message: 'Sorry, phone is invalid.' })
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean({ message: 'Sorry, $property is not boolean.' })
  isMember?: boolean;

}
