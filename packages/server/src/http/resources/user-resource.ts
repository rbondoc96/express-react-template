import { UserSelect } from '@/database/repositories/user-repository';
import { Resource } from '@/http/resources/resource';

export class UserResource extends Resource<UserSelect> {
    public base(): this {
        this._formatter = (user: UserSelect) => ({
            email: user.email,
            first_name: user.first_name,
            id: user.ulid,
            last_name: user.last_name,
            created_at: user.created_at,
            updated_at: user.updated_at,
        });

        return this;
    }
}
