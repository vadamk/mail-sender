export interface IConfig {
  home: string;
  admin: string;
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

export interface ITelegram {
  botToken: string;
}

export const config: IConfig = {
  home: 'https://shambhala.org/',
  admin: 'volodymyr.kravch@gmail.com',
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

export const telegram: ITelegram = {
  botToken: '786075752:AAE2VQ4DNo6y3gEqiEfavXiJuOwUWpUMYBM',
};
