export type IOneBotConnectionProtocol = 'http' | 'ws';
export interface IOneBotParameters {
  protocol: IOneBotConnectionProtocol;
  host: string;
  port: number;
  accessToken?: string;
}