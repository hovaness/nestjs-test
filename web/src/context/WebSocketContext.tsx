import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io('http://localhost:3001/chat');

export const WebSocketContext = createContext<Socket>(socket);

export const WebSocketProvider = WebSocketContext.Provider;

export function useWebSocket(){
    const socket = useContext(WebSocketContext);
    return socket;
}