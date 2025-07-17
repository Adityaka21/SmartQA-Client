import { io } from 'socket.io-client'
import { serverEndpoint } from "./appCon fig";

const socket = io(serverEndpoint);

export default socket;
