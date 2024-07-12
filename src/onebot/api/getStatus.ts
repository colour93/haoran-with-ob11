import { IOneBotApiBase, IOneBotApiClientBase } from "../typings/api";

export type IOneBotApiClientGetStatus = IOneBotApiClientBase<undefined, object>
export type IOneBotApiGetStatus = IOneBotApiBase<undefined, object>

const getStatus: IOneBotApiClientGetStatus = (apiClient) => apiClient.request('get_status')

export default getStatus;