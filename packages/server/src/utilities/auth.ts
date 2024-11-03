import { type CookieOptions } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { config } from '@/config';
import { type UserSelect } from '@/database/repositories/user-repository';

export type CreateJwtOptions = Partial<{
    iat: DateTime;
}>;

export const JwtCookieMeta = {
    name: 'jwt',
    options: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    },
} as const satisfies { name: string; options: CookieOptions };

export function createJwt(user: UserSelect, options?: CreateJwtOptions): string {
    const iat = options?.iat ?? DateTime.now();

    const payload = {
        exp: iat.plus({ minutes: config.auth.jwt_expire_minutes }).toSeconds(),
        iat: iat.toSeconds(),
        sub: user.ulid,
    };

    return jsonwebtoken.sign(payload, config.auth.jwt_private_key, {
        algorithm: 'RS256',
    });
}
