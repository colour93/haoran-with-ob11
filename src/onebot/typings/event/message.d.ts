import { IOneBotEventBase } from ".";
import { IOneBotGroupMessageAnonymous, IOneBotMessage, IOneBotMessageChain, IOneBotMessageType } from "../message";
import { IOneBotGroupMessageSender, IOneBotPrivateMessageSender } from "../sender";


export interface IOneBotEventMessageBase extends IOneBotEventBase {
  post_type: 'message';
  message_type: IOneBotMessageType;
  message_id: number;
  user_id: number;
  message: IOneBotMessageChain;
  raw_message: string;
  font: number;
  sender: IOneBotPrivateMessageSender | IOneBotGroupMessageSender;
}

export interface IOneBotEventPrivateMessage extends IOneBotEventMessageBase {
  message_type: 'private';
  sender: IOneBotPrivateMessageSender;
}

export interface IOneBotEventGroupMessage extends IOneBotEventMessageBase {
  message_type: 'group';
  group_id: number;
  anonymous: IOneBotGroupMessageAnonymous | null;
  sender: IOneBotGroupMessageSender;
}

export type IOneBotEventMessage = IOneBotEventGroupMessage | IOneBotEventPrivateMessage;
export type IOneBotEventMessageReturn = IOneBotMessage | void;


export interface IOneBotEventMessageListenerMap {
  'message': IOneBotEventGroupMessage | IOneBotEventPrivateMessage;
  'private-messsage': IOneBotEventPrivateMessage;
  'group-message': IOneBotEventGroupMessage;
}
export type IOneBotEventMessageListener = <K extends keyof IOneBotEventMessageListenerMap>(eventName: K, callback: (data: IOneBotEventMessageListenerMap[K]) => IOneBotEventMessageReturn | Promise<IOneBotEventMessageReturn>) => void
export type IOneBotEventMessageEmitter = <K extends keyof IOneBotEventMessageListenerMap>(eventName: K, data: IOneBotEventMessageListenerMap[K]) => boolean