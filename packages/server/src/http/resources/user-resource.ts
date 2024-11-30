import { userGetPermissions, UserSelect } from '@/database/repositories/user-repository';
import { Resource } from '@/http/resources/resource';

export class UserResource extends Resource<UserSelect> {
    public base(): this {
        this._formatter = (user: UserSelect) => ({
            created_at: user.created_at.toISOString(),
            first_name: user.first_name,
            id: user.ulid,
            last_name: user.last_name,
            last_signed_in_at: user.last_signed_in_at?.toISOString() ?? null,
            permissions: userGetPermissions(user),
            role: user.role,
            updated_at: user.updated_at.toISOString(),
            username: user.username,
        });

        return this;
    }
}
