import { atom } from 'recoil';
import { IChat, IMessage } from '../types';

export const userAtom = atom<any | null>({
  key: 'user',
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
