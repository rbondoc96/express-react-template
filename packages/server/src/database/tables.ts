import { type UserTable } from '@/database/repositories/user-repository';

export type Database = {
    users: UserTable;
};
