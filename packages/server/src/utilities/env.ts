import { config } from 'dotenv';
import { coerce, object } from 'zod';

config();

const envParser = object({
    PORT: coerce.number().default(8000),
});

export const env = envParser.parse(process.env);
