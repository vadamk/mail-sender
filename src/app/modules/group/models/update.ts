import {
  Length,
  IsOptional,
  IsMongoId
} from 'class-validator';

export class UpdateGroupRequest {

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  name?: string;

  @IsOptional()
  @Length(3, 32, { message: 'Sorry, $property must be between $constraint1 and $constraint2 characters long.' })
  description?: string;

  @IsOptional()
  @IsMongoId({ each: true, message: 'Sorry, $property is invalid.' })
  telegramChannels?: string[];

  @IsOptional()
  @IsMongoId({ each: true, message: 'Sorry, $property is invalid.' })
  viberGroups?: string[];

  @IsOptional()
  @IsMongoId({ each: true, message: 'Sorry, $property is invalid.' })
  persons?: string[];

}
