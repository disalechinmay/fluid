import { io } from 'socket.io-client';
import { backendServerUrl } from './api';

export const socket = io(backendServerUrl, {
  autoConnect: false,
});
