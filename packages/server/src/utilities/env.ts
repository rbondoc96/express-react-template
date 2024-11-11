import { config } from 'dotenv';
import { coerce, object, string } from 'zod';

config();

const envParser = object({
    ALLOWED_ORIGIN: string(),
    APP_URL: string(),
    CLIENT_URL: string(),
    DB_DATABASE: string(),
    DB_HOST: string(),
    DB_PASSWORD: string(),
    DB_PORT: coerce.number(),
    DB_USER: string(),
    MAIL_FROM_ADDRESS: string(),
    MAIL_HOST: string(),
    MAIL_PORT: coerce.number(),
    PORT: coerce.number().default(8000),
});

export const env = envParser.parse(process.env);
