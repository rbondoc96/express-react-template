import { Role } from '@common/enums/Role';
import bcrypt from 'bcryptjs';
import { type ColumnType, type Insertable, type Selectable, type Updateable } from 'kysely';
import { DateTime } from 'luxon';
import { ulid } from 'ulid';
import { db } from '@/database/db';
import { roles } from '@/rbac/roles';

export type UserTable = {
    id: ColumnType<number, never, never>;
    ulid: ColumnType<string, string | undefined, never>;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: ColumnType<Role, Role | undefined, Role>;
    last_signed_in_at: ColumnType<Date, string | undefined, string>;
    created_at: ColumnType<Date, never, never>;
    updated_at: ColumnType<Date, never, string>;
};

export type UserCreate = Insertable<UserTable>;
export type UserSelect = Selectable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export async function userCount(): Promise<number> {
    const { count } = await db.selectFrom('users').select(db.fn.countAll().as('count')).executeTakeFirstOrThrow();

    return typeof count === 'string' ? parseInt(count) : Number(count);
}

export async function userCreate(data: UserCreate): Promise<UserSelect> {
    const hashedPassword = await new Promise<string>((resolve, reject) => {
        bcrypt.hash(data.password, 10, (error, hash) => {
            if (error) {
                reject(error);
            }
            resolve(hash);
        });
    });

    const user: UserCreate = {
        ...data,
        password: hashedPassword,
        ulid: ulid().toLowerCase(),
    };

    return await db.insertInto('users').values(user).returningAll().executeTakeFirstOrThrow();
}

export async function userDelete(ulid: string): Promise<void> {
    await db.deleteFrom('users').where('ulid', '=', ulid).execute();
}

export async function userFindByEmail(email: string): Promise<UserSelect | undefined> {
    return userSelectQuery().selectAll().where('email', '=', email).executeTakeFirst();
}

export async function userFindByEmailOrThrow(email: string): Promise<UserSelect> {
    return userSelectQuery().selectAll().where('email', '=', email).executeTakeFirstOrThrow();
}

export async function userFindByUlid(ulid: string): Promise<UserSelect | undefined> {
    return userSelectQuery().selectAll().where('ulid', '=', ulid).executeTakeFirst();
}

export async function userFindByUlidOrThrow(ulid: string): Promise<UserSelect> {
    return userSelectQuery().selectAll().where('ulid', '=', ulid).executeTakeFirstOrThrow();
}

export function userSelectQuery() {
    return db.selectFrom('users');
}

export async function userUpdate(user: UserSelect, data: UserUpdate): Promise<UserSelect> {
    return db
        .updateTable('users')
        .set({
            ...data,
            updated_at: DateTime.now().toUTC().toISO(),
        })
        .where('ulid', '=', user.ulid)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export function userGetPermissions(user: UserSelect) {
    return roles[user.role];
}
