import { OneBotWsApiClient } from '../../server';
import { IOneBotApiResponseBase } from './response';

export type IOneBotApiClientBase<T, U> = (apiClient: OneBotWsApiClient, paramters?: T) => Promise<IOneBotApiResponseBase & U>
export type IOneBotApiBase<T, U> = (paramters?: T) => Promise<IOneBotApiResponseBase & U>
