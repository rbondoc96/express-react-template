import { type Request, type RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { number, object, string } from 'zod';
import { config } from '@/config';
import { userFindByUlid } from '@/database/repositories/user-repository';
import { NotAuthenticatedException } from '@/exceptions/not-authenticated-exception';
import { JwtCookieMeta } from '@/utilities/auth';

const tokenPayloadSchema = object({
    sub: string(),
    iat: number(),
});

export const authMiddleware: RequestHandler = async (req: Request, res, next) => {
    if (!req.cookies) {
        next(new NotAuthenticatedException());
        return;
    }

    const jwt = req.cookies[JwtCookieMeta.name];

    if (typeof jwt !== 'string') {
        res.clearCookie(JwtCookieMeta.name, JwtCookieMeta.options);
        next(new NotAuthenticatedException());
        return;
    }

    try {
        const payload = jsonwebtoken.verify(jwt, config.auth.jwt_public_key);

        if (typeof payload === 'string') {
            res.clearCookie(JwtCookieMeta.name, JwtCookieMeta.options);
            next(new NotAuthenticatedException());
            return;
        }

        const jwtPayload = tokenPayloadSchema.parse(payload);
        req.user = await userFindByUlid(jwtPayload.sub);

        next();
    } catch (error) {
        res.clearCookie(JwtCookieMeta.name, JwtCookieMeta.options);

        if (error instanceof jsonwebtoken.TokenExpiredError) {
            next(new NotAuthenticatedException());
            return;
        }

        next(error);
    }
};
