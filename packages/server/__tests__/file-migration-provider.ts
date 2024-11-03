import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { type Migration, type MigrationProvider } from 'kysely';
import ts from 'ts-node';

ts.register({
    transpileOnly: true,
});

/**
 * This custom class solves an issue when running Kysely migrations for tests, where files with `.ts`
 * are not recognized.
 *
 * @see{@link https://github.com/kysely-org/kysely/issues/277#issuecomment-2278899163}
 */
export class FileMigrationProvider implements MigrationProvider {
    constructor(private absolutePath: string) {}

    async getMigrations(): Promise<Record<string, Migration>> {
        const migrations: Record<string, Migration> = {};
        const files = await readdir(this.absolutePath);

        for (const fileName of files) {
            if (!fileName.endsWith('.ts')) {
                continue;
            }

            const importPath = join(this.absolutePath, fileName).replaceAll('\\', '/');
            const { up, down } = await import(importPath);
            const migrationKey = fileName.substring(0, fileName.lastIndexOf('.'));

            migrations[migrationKey] = { up, down };
        }

        return migrations;
    }
}
