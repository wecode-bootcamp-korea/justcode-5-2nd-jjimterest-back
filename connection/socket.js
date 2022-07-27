import { Server } from 'socket.io';

let io;
const socketConfig = {
  init: server => {
    io = new Server(server, { cors: '*' });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  },
};

export default socketConfig;
