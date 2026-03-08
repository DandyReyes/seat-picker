"use client";

import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { Socket } from "socket.io-client";
import { createSocket } from "./socket";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = createSocket();

    if (!s.connected) {
      s.connect();
    }

    setSocket(s);

    // ❌ Do NOT disconnect here
    // Let the socket live for the whole app lifetime
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
