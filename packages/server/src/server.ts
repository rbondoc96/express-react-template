import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { config } from '@/config';
import { errorMiddleware } from '@/http/middlewares/error-middleware';
import { apiRouter } from '@/routes/api';
import { env } from '@/utilities/env';

const app = express();
const port = env.PORT;

app.use(
    cors({
        origin: config.app.allowed_origin,
        credentials: true,
    }),
);

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Parse application/json
app.use(express.json());
// Parse cookies in request headers
app.use(cookieParser());

app.use('/api', apiRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
