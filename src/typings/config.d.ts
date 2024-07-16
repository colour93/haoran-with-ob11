import { IOneBotParameters } from "../onebot/typings/server";

export interface Config {
  selfUin: number;
  onebot: IOneBotParameters;
  openai: {
    baseURL: string;
    apiKey: string;
    model: string;
  }
}