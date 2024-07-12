import { nanoid } from "nanoid";
import { IOneBotParameters } from "../typings/server";
import WebSocket from 'ws';
import { IOneBotApiResponseBase } from "../typings/api/response";
import getStatus, { IOneBotApiGetStatus } from "../api/getStatus";
import sendGroupMsg, { IOneBotApiSendGroupMsg } from "../api/sendGroupMsg";
import { EventEmitter } from "events";
import { IOneBotEvent, IOneBotEventEmitter, IOneBotEventListener } from "../typings/event";

export class OneBot {

  wsApiInstance: WebSocket;
  wsEventInstance: WebSocket;

  wsApiClient: OneBotWsApiClient;

  api: OneBotApi;
  event: OneBotEvent;

  onConnected?: Function;

  constructor({ protocol, host, port, accessToken }: IOneBotParameters) {

    this.wsApiInstance = new WebSocket(`ws://${host}:${port}/api`, {
      headers: {
        authorization: accessToken && `Bearer ${accessToken}`
      }
    });

    this.wsEventInstance = new WebSocket(`ws://${host}:${port}/event`, {
      headers: {
        authorization: accessToken && `Bearer ${accessToken}`
      }
    });

    this.wsApiClient = new OneBotWsApiClient(this.wsApiInstance);

    this.api = new OneBotApi(this.wsApiClient);
    this.event = new OneBotEvent(this.wsEventInstance);

    this.wsApiInstance.on('open', () => {
      this.onConnected?.()
    })

  }
}

export class OneBotWsApiClient {

  wsInstance: WebSocket;
  responseHandlerList: {
    [id: string]: Function;
  };
  request: (action: string, parameters?: object) => Promise<any>;

  constructor(wsInstance: WebSocket) {
    this.wsInstance = wsInstance;
    this.responseHandlerList = {};

    wsInstance.on('message', (message) => {
      const messageObj = JSON.parse(message.toString()) as IOneBotApiResponseBase;
      if (messageObj.echo) {
        const eventIdList = Object.keys(this.responseHandlerList);
        if (eventIdList.includes(messageObj.echo)) {
          this.responseHandlerList[messageObj.echo](messageObj);
          delete this.responseHandlerList[messageObj.echo];
        }
      }
    })

    this.request = (action, parameters = {}) => new Promise((resolve, reject) => {
      const echo = nanoid();
      try {
        const parametersString = JSON.stringify({
          params: parameters,
          action,
          echo
        });
        this.responseHandlerList[echo] = resolve
        wsInstance.send(parametersString);
      } catch (error) {
        reject(error)
      }
    })
  }
}

export class OneBotApi {
  apiClient: OneBotWsApiClient;

  sendGroupMsg: IOneBotApiSendGroupMsg;
  getStatus: IOneBotApiGetStatus;

  constructor(apiClient: OneBotWsApiClient) {
    this.apiClient = apiClient;
    this.getStatus = () => getStatus(apiClient);
    this.sendGroupMsg = (parameters) => sendGroupMsg(apiClient, parameters);
  }
}

export class OneBotEvent {

  _emitter: EventEmitter;

  wsInstance: WebSocket;

  _emit: IOneBotEventEmitter;
  on: IOneBotEventListener;

  constructor(wsInstance: WebSocket) {
    this.wsInstance = wsInstance;
    this._emitter = new EventEmitter();
    this._emit = this._emitter.emit;
    this.on = this._emitter.on;

    wsInstance.on('message', (wsMessage) => {
      try {
        const wsMsgObj = JSON.parse(wsMessage.toString()) as IOneBotEvent;

        if (wsMsgObj.post_type === 'message') {
          this._emit('message', wsMsgObj);

          wsMsgObj.message_type === 'private' && this._emit('private-messsage', wsMsgObj); 
          wsMsgObj.message_type === 'group' && this._emit('group-message', wsMsgObj);
        }

      } catch (error) {
        console.error(error);
      }
    })
  }
}