import { io } from "socket.io-client";

// autoConnect: false prevents Next.js from trying to connect during server-side rendering
export const socket = io("http://localhost:5000", {
  autoConnect: false,
});