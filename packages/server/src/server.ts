import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { config } from '@/config';
import { errorMiddleware } from '@/http/middlewares/error-middleware';
import { apiRouter } from '@/routes/api';

export const server = express();
const port = config.app.port;

server.use(
    cors({
        origin: config.app.allowed_origin,
        credentials: true,
    }),
);

// Parse application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: false }));
// Parse application/json
server.use(express.json());
// Parse cookies in request headers
server.use(cookieParser());

server.use('/api', apiRouter);

server.use(errorMiddleware);

server.listen(port, () => {
    if (config.app.env === 'development') {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }
});
