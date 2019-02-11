export class EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class FullEmailOptions extends EmailOptions {
  from: string;
}
