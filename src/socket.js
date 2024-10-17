import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_UNITY
  ? import.meta.env.VITE_SOCKET_UNITY
  : "http://localhost:3000";

export const socket = io(URL);
