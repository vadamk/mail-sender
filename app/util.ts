import * as _ from 'lodash';
import { Validator } from 'class-validator';

export const trim = (x: any) => _.isString(x) ? _.trim(x) : x;

export const isMongoId = (id: string): boolean => {
  const validator = new Validator();
  return validator.isMongoId(id);
};

export const exceptMongoId = (model: any) => {

  if (typeof model !== 'object') {
    return model;
  }

  const { _id, ...pureModel } = model;

  return pureModel;
};
