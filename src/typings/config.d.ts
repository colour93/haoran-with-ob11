import { IOneBotParameters } from "../onebot/typings/server";

export interface Config {
  selfUin: number;
  onebot: IOneBotParameters;
  openai: {
    currentConfig: string,
    configs: Record<string, {
      baseURL: string;
      apiKey: string;
      model: string;
    }>
  },
  notify?: {
    groupId: number;
    events: {
      online: boolean;
    }
  }
}