import { config } from 'dotenv';
import { coerce, literal, nullable, object, string, union } from 'zod';

config();

const envParser = object({
    ALLOWED_ORIGIN: string(),
    APP_URL: string(),
    CLIENT_DOMAIN: nullable(string()),
    DB_DATABASE: string(),
    DB_HOST: string(),
    DB_PASSWORD: string(),
    DB_PORT: coerce.number(),
    DB_USER: string(),
    NODE_ENV: union([literal('development'), literal('production')]).default('development'),
    PORT: coerce.number().default(8000),
});

export const env = envParser.parse(process.env);
