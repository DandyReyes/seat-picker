import { io, Socket } from "socket.io-client";

export const URL =
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000";

let socket: Socket | null = null;

export function createSocket() {
  if (!socket) {
    socket = io(URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    });
  }
  return socket;
}
