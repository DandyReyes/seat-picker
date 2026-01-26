"use client";
import { useEffect } from "react";
import { socket } from "./socket";

export function SocketProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return children;
}
