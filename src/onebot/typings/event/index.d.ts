import {IOneBotEventMessage, IOneBotEventMessageEmitter, IOneBotEventMessageListener } from "./message";

export type IOneBotEventPostType = 'message' | 'notice' | 'request' | 'meta_event';

export interface IOneBotEventBase {
  time: number;
  self_id: number;
  post_type: IOneBotEventPostType;
}

export type IOneBotEvent = IOneBotEventMessage;

export type IOneBotEventListener = IOneBotEventMessageListener;

export type IOneBotEventEmitter = IOneBotEventMessageEmitter;