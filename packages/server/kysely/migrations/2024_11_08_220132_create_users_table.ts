import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('users')
        .addColumn('id', 'serial', (column) => column.primaryKey())
        .addColumn('ulid', 'varchar', (column) => column.unique().notNull())
        .addColumn('email', 'varchar', (column) => column.unique().notNull())
        .addColumn('first_name', 'varchar', (column) => column.notNull())
        .addColumn('last_name', 'varchar', (column) => column.notNull())
        .addColumn('password', 'varchar', (column) => column.notNull())
        .addColumn('email_verified_at', 'timestamptz')
        .addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('users').execute();
}
