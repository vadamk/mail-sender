import * as _ from 'lodash';

export const trim = (x: any) => _.isString(x) ? _.trim(x) : x;

export const exceptMongoId = (model: any) => {

  if (!_.isObject(model)) {
    return model;
  }

  const { _id, ...pureModel } = model;

  return pureModel;
};
