import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { env } from './utilities/env';

export const config = {
    app: {
        url: env.APP_URL,
        client_url: env.CLIENT_URL,
    },
    auth: {
        jwt_private_key: readFileSync(
            join(dirname(fileURLToPath(import.meta.url)), '..', 'jwtRSA256-private.pem'),
            'utf-8',
        ),
        jwt_public_key: readFileSync(
            join(dirname(fileURLToPath(import.meta.url)), '..', 'jwtRSA256-public.pem'),
            'utf-8',
        ),
    },
    database: {
        database: env.DB_DATABASE,
        host: env.DB_HOST,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
        user: env.DB_USER,
    },
} as const;
