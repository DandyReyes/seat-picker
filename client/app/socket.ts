import { io, Socket } from "socket.io-client";

export function createSocket(): Socket {
  const URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : "http://localhost:8000";

  return io(URL, {
    autoConnect: false,
    transports: ["websocket"],
  });
}
