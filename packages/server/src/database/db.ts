import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { config } from '@/config';
import { Database } from '@/database/tables';

const dialect = new PostgresDialect({
    pool: new pg.Pool({
        database: config.database.database,
        host: config.database.host,
        password: config.database.password,
        port: config.database.port,
        user: config.database.user,
        max: 10,
        ssl: true,
    }),
});

export const db = new Kysely<Database>({
    dialect,
});
