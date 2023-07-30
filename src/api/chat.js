import path from 'path';
import { fileURLToPath } from 'url';

const socketRoomsId = {};

const startToChat = async (req, res) => {
  const { roomId } = req.params;
  const io = req.app.get('io');
  
  io.on('connection', (socket) => {
    socketRoomsId[socket.id] = roomId;
  });
  
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const filePath = path.join(dirname, '..', 'public', 'chat-room.html');
  
  res.sendFile(filePath);
};


export { startToChat, socketRoomsId };
