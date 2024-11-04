import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/hello', async (_req, res) => {
    res.status(200).json({
        message: 'hello world',
    });
});
