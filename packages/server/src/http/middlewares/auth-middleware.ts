import { type Request, type RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { number, object, string } from 'zod';
import { config } from '@/config';
import { userFindByUlid } from '@/database/repositories/user-repository';
import { NotAuthenticatedException } from '@/exceptions/not-authenticated-exception';

const tokenPayloadSchema = object({
    sub: string(),
    iat: number(),
});

export const authMiddleware: RequestHandler = async (req: Request, res, next) => {
    if (!req.cookies) {
        next(new NotAuthenticatedException());
        return;
    }

    const jwt = req.cookies['jwt'];

    if (typeof jwt !== 'string') {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        next(new NotAuthenticatedException());
        return;
    }

    try {
        const payload = jsonwebtoken.verify(jwt, config.auth.jwt_public_key);

        if (typeof payload === 'string') {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            next(new NotAuthenticatedException());
            return;
        }

        const jwtPayload = tokenPayloadSchema.parse(payload);
        req.user = await userFindByUlid(jwtPayload.sub);

        next();
    } catch (error) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

        if (error instanceof jsonwebtoken.TokenExpiredError) {
            next(new NotAuthenticatedException());
            return;
        }

        next(error);
    }
};
