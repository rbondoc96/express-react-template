import cors from 'cors';
import express from 'express';
import { apiRouter } from '@/routes/api';
import { env } from '@/utilities/env';

const app = express();
const port = env.PORT;

app.use(
    cors({
        origin: env.ALLOWED_ORIGIN,
    }),
);

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
