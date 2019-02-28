const h2p = require('html2plaintext');
const mjml2html = require('mjml');

import { MjmlResult } from '../models/email';

export const mjmlConverter = (mjml: string): MjmlResult => {

  const
    { html } = mjml2html(mjml),
    text = h2p(html);

  return { html, text };
};
