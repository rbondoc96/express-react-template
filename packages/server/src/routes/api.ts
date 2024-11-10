import { Router } from 'express';
import { authController } from '@/http/controllers/auth-controller';

export const apiRouter = Router();

apiRouter.use('/auth', authController);

apiRouter.get('/hello', async (_req, res) => {
    res.status(200).json({
        message: 'hello world',
    });
});
