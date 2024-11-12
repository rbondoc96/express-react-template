import { env } from './utilities/env';

export const config = {
    app: {
        url: env.APP_URL,
        client_url: env.CLIENT_URL,
    },
    database: {
        database: env.DB_DATABASE,
        host: env.DB_HOST,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
        user: env.DB_USER,
    },
} as const;
