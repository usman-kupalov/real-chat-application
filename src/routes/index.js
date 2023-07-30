import { Router } from 'express';
import { startToChat } from '../api/chat.js';
import expressAsyncHandler from 'express-async-handler';

const router = Router();

router.get('/room/:roomId', expressAsyncHandler(startToChat));

export { router };
