import { config } from 'dotenv';
import { coerce, object, string } from 'zod';

config();

const envParser = object({
    ALLOWED_ORIGIN: string(),
    PORT: coerce.number().default(8000),
});

export const env = envParser.parse(process.env);
