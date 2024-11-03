import type { UserSelect } from '@/database/repositories/user-repository';

declare global {
    namespace Express {
        interface User extends UserSelect {}

        interface Request {
            user?: User | undefined;
        }
    }
}
