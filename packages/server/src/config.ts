import { env } from './utilities/env';

export const config = {
    database: {
        database: env.DB_DATABASE,
        host: env.DB_HOST,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
        user: env.DB_USER,
    },
} as const;
