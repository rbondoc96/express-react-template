import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Kysely, Migrator, NO_MIGRATIONS, PostgresDialect } from 'kysely';
import pg from 'pg';
import { FileMigrationProvider } from '@tests/file-migration-provider';
import { config } from '@/config';
import { type Database } from '@/database/tables';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationFolder = join(__dirname, '..', 'kysely', 'migrations');

export class TestMigrator {
    private readonly database: Kysely<Database>;
    private readonly migrator: Migrator;
    private didMigrate: boolean;

    constructor() {
        if (config.app.env !== 'test') {
            throw new Error('This migrator should only be ran when NODE_ENV=test.');
        }

        this.database = new Kysely<Database>({
            dialect: new PostgresDialect({
                pool: new pg.Pool({
                    host: config.database.host,
                    port: config.database.port,
                    database: config.database.database,
                    user: config.database.user,
                    password: config.database.password,
                }),
            }),
        });

        this.migrator = new Migrator({
            db: this.database,
            provider: new FileMigrationProvider(migrationFolder),
        });

        this.didMigrate = false;
    }

    public async start(): Promise<void> {
        const { error, results } = await this.migrator.migrateToLatest();

        results?.forEach((result) => {
            if (result.status === 'Error') {
                console.error(`Failed to execute migration "${result.migrationName}".`);
            } else if (result.status === 'NotExecuted') {
                console.warn(`Did not execute migration "${result.migrationName}".`);
            }
        });

        if (error) {
            console.error('Failed to execute migrations');
            console.error(error);
            process.exit(1);
        }

        this.didMigrate = true;
    }

    public async killDatabase(): Promise<void> {
        if (this.didMigrate) {
            await this.migrator.migrateTo(NO_MIGRATIONS);
        }
    }
}
