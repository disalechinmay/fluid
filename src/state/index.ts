import { atom } from 'recoil';
import { IChat, IMessage, IUser } from '../types';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { User } from '@auth0/auth0-react';

export const userAtom = atom<IUser | null>({
  key: 'user',
  default: null,
});

export const userPictureAtom = atom<string | null>({
  key: 'userPicture',
  default: null,
});

export const accessTokenAtom = atom<string | null>({
  key: 'accessToken',
  default: null,
});

export const isAppDrawerVisibleAtom = atom<boolean>({
  key: 'isAppDrawerVisible',
  default: window.innerWidth > 600 ? true : false,
});

export const chatsMetadataAtom = atom<IChat[]>({
  key: 'chatsMetadata',
  default: [],
});

export const selectedChatAtom = atom<string | null>({
  key: 'selectedChat',
  default: null,
});

export const messagesAtom = atom<IMessage[] | null>({
  key: 'messages',
  default: null,
});
