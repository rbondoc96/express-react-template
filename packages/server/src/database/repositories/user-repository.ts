import bcrypt from 'bcryptjs';
import { type ColumnType, type Generated, type Insertable, type Selectable, type Updateable } from 'kysely';
import { DateTime } from 'luxon';
import { ulid } from 'ulid';
import { db } from '@/database/db';

export type UserTable = {
    id: Generated<number>;
    ulid: Generated<string>;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
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

export async function userFindByUlid(ulid: string): Promise<UserSelect> {
    return userSelectQuery().selectAll().where('ulid', '=', ulid).executeTakeFirstOrThrow();
}

export function userSelectQuery() {
    return db.selectFrom('users');
}

export async function userUpdate(user: UserSelect, data: UserUpdate) {
    return db
        .updateTable('users')
        .set({
            ...data,
            updated_at: DateTime.now().toUTC().toISO(),
        })
        .where('ulid', '=', user.ulid)
        .executeTakeFirstOrThrow();
}
