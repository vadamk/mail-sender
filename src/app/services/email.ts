import * as nodeMailer from 'nodemailer';
import { email } from '../config';
import { EmailOptions } from '../models/email';

const transporter = nodeMailer.createTransport(email.smtp);

export const sendMessage = async (mailOptions: EmailOptions) => {
  await transporter.sendMail({ ...mailOptions, from: email.from });
};

