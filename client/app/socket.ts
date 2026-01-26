import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? process.env.SERVER : 'http://localhost:8000';

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});