import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('users')
        .addColumn('role', 'varchar', (column) => column.notNull().defaultTo('user'))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.alterTable('users').dropColumn('role').execute();
}
