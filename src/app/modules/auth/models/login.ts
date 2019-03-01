import { IsEmail, IsNotEmpty } from 'class-validator';
import * as util from '../../../utils';

export class LoginRequest {

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  @IsEmail({}, { message: 'Sorry, email is invalid.' })
  email: string;

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  password: string;

  static from(json: any) {
    const model = new LoginRequest();
    model.email = util.trim(json.email);
    model.password = util.trim(json.password);
    return model;
  }
}
