import * as _ from 'lodash';
import { Middleware, Context } from 'koa';

export const trim = (x: any) => _.isString(x) ? _.trim(x) : x;

export const exceptMongoId = (model: any) => {

  if (!_.isObject(model)) {
    return model;
  }

  const { _id, ...pureModel } = model;

  return pureModel;
};

export const isExists = (value: any): boolean => {
  return !(_.isNull(value) || _.isUndefined(value));
};

export const cleanupData = (obj: any): any => {
  return _.reduce(_.keys(obj), (acc: any, cur: any) => {
    if (!isExists(obj[cur])) {
      return acc;
    }
    acc[cur] = _.isObject(obj[cur]) ? cleanupData(obj[cur]) : trim(obj[cur]);
    return acc;
  }, {});
};

export const requestDataCleaner = async (ctx: Context, next: Function) => {
  ctx.request.body = cleanupData(ctx.request.body);
  await next();
};
