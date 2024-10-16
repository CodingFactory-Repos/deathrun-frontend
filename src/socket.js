import { io } from 'socket.io-client';

const URL = process.env.SOCKET_URL ? process.env.SOCKET_URL : 'http://localhost:3000';

export const socket = io(URL);