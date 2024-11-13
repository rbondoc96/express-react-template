import jsonwebtoken from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { config } from '@/config';
import { type UserSelect } from '@/database/repositories/user-repository';

export function createJwt(user: UserSelect): string {
    const payload = {
        sub: user.ulid,
        iat: DateTime.now().toSeconds(),
    };

    return jsonwebtoken.sign(payload, config.auth.jwt_private_key, {
        expiresIn: 60 * 15,
        algorithm: 'RS256',
    });
}
