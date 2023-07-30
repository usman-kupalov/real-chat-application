import express from 'express';
import config from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/error.handler.js';
import { chatModule } from './socket/chat.server.js';

config.configDotenv({ path: '.env' });
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('io', io);
chatModule(io);

app.use('/api', router);
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Application is running on port ${process.env.PORT}`);
})
