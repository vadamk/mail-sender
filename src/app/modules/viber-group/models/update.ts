import { Length, IsOptional } from 'class-validator';

export class UpdateViberGroupRequest {

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  name: string;

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  description: string;

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  channelId: string;
}
