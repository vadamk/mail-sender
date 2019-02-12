import * as _ from 'lodash';
import { Validator } from 'class-validator';
import { MjmlResult } from './models/email';

const h2p = require('html2plaintext');
const mjml2html = require('mjml');

export const trim = (x: any) => _.isString(x) ? _.trim(x) : x;

export const isMongoId = (id: string): boolean => {
  const validator = new Validator();
  return validator.isMongoId(id);
};

export const exceptMongoId = (model: any) => {

  if (!_.isObject(model)) {
    return model;
  }

  const { _id, ...pureModel } = model;

  return pureModel;
};

export const mjmlConverter = (mjml: string): MjmlResult => {

  const
    { html } = mjml2html(mjml),
    text = h2p(html);

  return { html, text };
};
