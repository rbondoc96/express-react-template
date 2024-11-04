import { config } from 'dotenv';
import { coerce, object } from 'zod';

config();

const envParser = object({
    SERVER_PORT: coerce.number(),
});

export const env = envParser.parse(process.env);
