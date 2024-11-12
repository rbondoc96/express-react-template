import { Router } from 'express';
import { authController } from '@/http/controllers/auth-controller';

export const apiRouter = Router();

apiRouter.use('/auth', authController);
