export interface IUserBase {
  uid: string;
  email: string;
}

export interface IUser extends IUserBase {
  chats: IChat[];
}

export interface IChat {
  uid: string;
  participants: IUserBase[];
}

export interface IMessage {
  chatId: string;
  sender: IUserBase;
  text: string;
  timestamp: Date;
}
