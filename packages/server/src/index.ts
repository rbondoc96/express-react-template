import cors from 'cors';
import express from 'express';
import { apiRouter } from '@/routes/api';
import { env } from '@/utilities/env';

const app = express();
const port = env.SERVER_PORT;

app.use(cors());
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
    res.send('Express + TypeScript server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
