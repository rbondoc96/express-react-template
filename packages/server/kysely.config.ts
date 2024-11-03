import { defineConfig } from 'kysely-ctl';
import { DateTime } from 'luxon';
import pg from 'pg';

import { config } from './src/config';

export default defineConfig({
    dialect: 'pg',
    dialectConfig: {
        pool: new pg.Pool({
            database: config.database.database,
            host: config.database.host,
            password: config.database.password,
            port: config.database.port,
            user: config.database.user,
            ssl: config.app.is_production,
        }),
    },
    migrations: {
        allowJS: false,
        allowUnorderedMigrations: false,
        getMigrationPrefix: () => DateTime.now().toFormat('yyyy_MM_dd_HHmmss_'),
        migrationFolder: 'kysely/migrations',
    },
    seeds: {
        allowJS: false,
        seedFolder: 'kysely/seeders',
    },
});
