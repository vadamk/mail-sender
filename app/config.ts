export interface IConfig {
  port: number;
  saltRounds: number;
}

export const config: IConfig = {
  port: parseInt(process.env.NODE_PORT, 10) || 3000,
  saltRounds: 10,
};
