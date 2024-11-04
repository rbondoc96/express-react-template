import express from 'express';

const app = express();
const port = 9999;

app.get('/', (_req, res) => {
    res.send('Express + TypeScript server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
