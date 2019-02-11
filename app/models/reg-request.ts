import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ResolveRegistrationRequest {

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  accept: boolean;

  @IsNotEmpty({ message: 'Sorry, $property is required.' })
  @IsMongoId({ message: 'Sorry, $property isn\'t mongoId type.' })
  id: string;

  static from(json: any) {
    const model = new ResolveRegistrationRequest();
    model.id = json.id;
    model.accept = json.accept;
    return model;
  }

}
