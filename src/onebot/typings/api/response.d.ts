export interface IOneBotApiResponseBase {
  data: unknown;
  echo?: string;
  retcode: number;
  message: string;
  status: string;
}