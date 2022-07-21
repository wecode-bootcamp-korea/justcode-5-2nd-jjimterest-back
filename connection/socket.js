import { Server } from 'socket.io';

const io = new Server({ cors: '*' });
io.on('connection', socket => {
  socket.on('user_connected', data => {
    data.name;
  });
  socket.emit('nicknam2', data => {});
});
