import { IOneBotApiBase, IOneBotApiClientBase } from "../typings/api";
import { IOneBotMessage } from "../typings/message";

export interface Request {
  group_id: number;
  message: IOneBotMessage;
  auto_escape?: boolean;
}

interface Response {
  message_id: number;
}

export type IOneBotApiClientSendGroupMsg = IOneBotApiClientBase<Request, Response>
export type IOneBotApiSendGroupMsg = IOneBotApiBase<Request, Response>

const sendGroupMsg: IOneBotApiClientSendGroupMsg = (apiClient, parameters) => apiClient.request('send_group_msg', parameters)

export default sendGroupMsg;