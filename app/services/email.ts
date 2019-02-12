import * as nodeMailer from 'nodemailer';
import { email } from '../config';
import { EmailOptions, MjmlResult } from '../models/email';

const h2p = require('html2plaintext');
const mjml2html = require('mjml');

const transporter = nodeMailer.createTransport(email.smtp);

export const sendMessage = async (mailOptions: EmailOptions) => {
  await transporter.sendMail({ ...mailOptions, from: email.from });
};

export const mjmlConverter = (mjml: string): MjmlResult => {

  const
    { html } = mjml2html(mjml),
    text = h2p(html);

  return { html, text };
};
