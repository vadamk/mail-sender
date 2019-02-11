import * as _ from 'lodash';
import { ValidationError } from 'class-validator';

export const trim = (x: any) => _.isString(x) ? _.trim(x) : x;

export const errorFormalize = (error: ValidationError) => {
  return {
    field: error.property,
    messages: _.values(error.constraints)
  };
};

export const exceptMongoId = (model: any) => {

  if (typeof model !== 'object') {
    return model;
  }

  const { _id, ...pureModel } = model;

  return pureModel;
};
