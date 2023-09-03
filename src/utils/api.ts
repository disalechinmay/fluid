import { IMessage, IUser, IUserBase } from '../types';

export const backendServerUrl: string =
  process.env.REACT_APP_BACKEND_SERVER_LOCATION || '';

export const getDefaultHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getDefaultPostHeaders = (token: string) => {
  return {
    ...getDefaultHeaders(token),
    'Content-Type': 'application/json;charset=utf-8',
  };
};

export const fetchUserInformation = async (
  accessToken: string,
  uid: string,
  email: string,
  picture: string
): Promise<IUser | null> => {
  const res = await fetch(`${backendServerUrl}/api/users/${uid}`, {
    method: 'POST',
    headers: getDefaultPostHeaders(accessToken),
    body: JSON.stringify({ uid, email, picture }),
  });

  const user = await res.json();
  return user;
};

export const fetchChatMessages = async (
  accessToken: string,
  chatId: string,
  last: string
): Promise<IMessage[]> => {
  const res = await fetch(
    `${backendServerUrl}/api/messages/${chatId}/${last}`,
    {
      method: 'GET',
      headers: getDefaultHeaders(accessToken),
    }
  );

  const messages = await res.json();
  return messages;
};

export const postMessage = async (
  accessToken: string,
  chatId: string,
  senderId: string,
  text: string
): Promise<IMessage> => {
  const res = await fetch(`${backendServerUrl}/api/messages/${chatId}`, {
    method: 'POST',
    headers: getDefaultPostHeaders(accessToken),
    body: JSON.stringify({ chatId, senderId, text }),
  });

  const message = await res.json();
  return message;
};

export const searchUsers = async (
  accessToken: string,
  query: string
): Promise<IUserBase[]> => {
  const res = await fetch(`${backendServerUrl}/api/users/search/${query}`, {
    method: 'GET',
    headers: getDefaultHeaders(accessToken),
  });

  const users = await res.json();
  return users;
};

export const createChat = async (
  accessToken: string,
  oppositeUserId: string
): Promise<string> => {
  const res = await fetch(`${backendServerUrl}/api/chats`, {
    method: 'POST',
    headers: getDefaultPostHeaders(accessToken),
    body: JSON.stringify({ uid: oppositeUserId }),
  });

  const chatId = await res.json();
  return chatId;
};
