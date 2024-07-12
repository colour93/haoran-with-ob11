export interface IOneBotMessageItemBase {
  type: string;
  data: object;
}

export interface IOneBotMessageItemText extends IOneBotMessageItemBase {
  type: 'text';
  data: {
    text: string;
  }
}
export interface IOneBotMessageItemImage extends IOneBotMessageItemBase {
  type: 'image';
  data: {
    file: string;
    type?: 'flash';
  }
}
export interface IOneBotMessageItemFace extends IOneBotMessageItemBase {
  type: 'face';
  data: {
    id: string
  }
}
export enum IOneBotMessageItemRecordMagic {
  ENABLED = 1,
  DISABLED = 0
}
export interface IOneBotMessageItemRecord extends IOneBotMessageItemBase {
  type: 'record';
  data: {
    file: string;
    magic?: IOneBotMessageItemRecordMagic;
    url?: string;
  }
}
export interface IOneBotMessageItemVideo extends IOneBotMessageItemBase {
  type: 'video';
  data: {
    file: string;
    url?: string;
  }
}
export interface IOneBotMessageItemAt extends IOneBotMessageItemBase {
  type: 'at';
  data: {
    qq: 'all' | string
  }
}
export interface IOneBotMessageItemShake extends IOneBotMessageItemBase {
  type: 'shake';
  data: {}
}
export interface IOneBotMessageItemPoke extends IOneBotMessageItemBase {
  type: 'poke';
  data: {
    type: string;
    id: string;
  }
}
export interface IOneBotMessageItemAnonymous extends IOneBotMessageItemBase {
  type: 'anonymous';
  data: {}
}
export interface IOneBotMessageItemShare extends IOneBotMessageItemBase {
  type: 'share';
  data: {
    url: string;
    title: string;
    content?: string;
    image?: string;
  }
}
export interface IOneBotMessageItemContact extends IOneBotMessageItemBase {
  type: 'contact';
  data: {
    type: 'qq' | 'group' | string;
    id: string;
  }
}
export interface IOneBotMessageItemLocation extends IOneBotMessageItemBase {
  type: 'location';
  data: {
    lat: string;
    lon: string;
  }
}
export interface IOneBotMessageItemReply extends IOneBotMessageItemBase {
  type: 'reply';
  data: {
    id: string;
  }
}

export type IOneBotMessageItem = IOneBotMessageItemText | IOneBotMessageItemImage | IOneBotMessageItemFace | IOneBotMessageItemRecord | IOneBotMessageItemVideo | IOneBotMessageItemAt | IOneBotMessageItemShake | IOneBotMessageItemPoke | IOneBotMessageItemAnonymous | IOneBotMessageItemShare | IOneBotMessageItemContact | IOneBotMessageItemLocation | IOneBotMessageItemReply;
export type IOneBotMessageChain = IOneBotMessageItem[];
export type IOneBotMessage = string | IOneBotMessageChain;

export type IOneBotMessageType = 'group' | 'private';
export type IOneBotPrivateMessageSubType = 'friend' | 'group' | 'other';
export type IOneBotGroupMessageSubType = 'normal' | 'notice' | 'anonymous';

export interface IOneBotGroupMessageAnonymous {
  id: number;
  name: string;
  flag: string;
}
