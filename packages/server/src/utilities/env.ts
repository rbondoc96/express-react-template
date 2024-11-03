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
    JWT_EXPIRE_MINUTES: coerce.number(),
    NODE_ENV: union([literal('development'), literal('production'), literal('test')]).default('development'),
    PORT: coerce.number().default(8000),
    RENDER: string().transform((value) => value.toLowerCase() === 'true'),
});

export const env = envParser.parse(process.env);
