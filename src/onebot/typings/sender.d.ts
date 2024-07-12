export interface IOneBotPrivateMessageSender {
  user_id: number;
  nickname: string;
  sex: 'male' | 'female' | 'unknown';
  age: number;
}

export interface IOneBotGroupMessageSender extends IOneBotPrivateMessageSender {
  card: string;
  area: string;
  level: string;
  role: 'admin' | 'owner' | 'member';
  title: string;
}