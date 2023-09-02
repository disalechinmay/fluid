import { IMessage, IUser } from '../types';

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
  email: string
): Promise<IUser | null> => {
  const res = await fetch(`${backendServerUrl}/api/users/${uid}`, {
    method: 'POST',
    headers: getDefaultPostHeaders(accessToken),
    body: JSON.stringify({ uid, email }),
  });

  const user = await res.json();
  return user;
};

export const fetchChatMessages = async (
  accessToken: string,
  chatId: string
): Promise<IMessage[]> => {
  const res = await fetch(`${backendServerUrl}/api/messages/${chatId}`, {
    method: 'GET',
    headers: getDefaultHeaders(accessToken),
  });

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
