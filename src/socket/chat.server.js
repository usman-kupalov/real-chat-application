import { socketRoomsId } from '../api/chat.js';

const chatModule = (io) => {
  io.on('connection', (socket) => {
    console.log(`User with socket id ${socket.id} connected`);

    socket.on('setUsername', (data) => {
      if (data.username.length === 0 ) return socket.emit('emptyChat', 'Input your username');

      const roomId = socketRoomsId[socket.id];
      socket.join(roomId);
      socket.emit('chat', data);
    });

    socket.on('sendMessage', (data) => {
      if (data.message.length === 0) return socket.emit('emptyChat', 'Input your message');

      const roomId = socketRoomsId[socket.id];
      io.sockets.to(roomId).emit('userMessage', {
        user: data.user,
        room: roomId,
        message: data.message
      });
    });

    socket.on('disconnect', () => {
      delete socket.adapter.rooms[socket.id];
      console.log(`User left room ${socketRoomsId[socket.id]}`);
      delete socketRoomsId[socket.id];
    });
  });
}

export { chatModule };
