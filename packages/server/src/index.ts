import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import { apiRouter } from '@/routes/api';
import { env } from '@/utilities/env';

const path = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = env.PORT;

app.use(cors());

app.use(express.static(join(path, '..', 'public')));

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
