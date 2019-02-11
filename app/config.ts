export interface IConfig {
  home: string;
  port: number;
  saltRounds: number;
}

export interface IEmail {
  from: string;
  smtp: {
    host: string;
    secure: boolean;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export const config: IConfig = {
  home: 'https://shambhala.org/',
  port: parseInt(process.env.NODE_PORT, 10) || 3000,
  saltRounds: 10
};

export const email: IEmail = {
  from: '"Lviv Shambhala Center" <foo@example.com>',
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'adamkskif@gmail.com',
      pass: '19950721Av'
    }
  }
};
