import { type Request, type RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { number, object, string } from 'zod';
import { config } from '@/config';
import { userFindByUlidOrThrow } from '@/database/repositories/user-repository';
import { BadRequestException } from '@/exceptions/bad-request-exception';

const tokenPayloadSchema = object({
    sub: string(),
    iat: number(),
});

export const authMiddleware: RequestHandler = async (req: Request, res, next) => {
    if (!req.cookies) {
        next(new BadRequestException('Unauthorized'));
        return;
    }

    const jwt = req.cookies['jwt'];

    if (typeof jwt !== 'string') {
        next(new BadRequestException('Unauthorized'));
        res.clearCookie('jwt');
        return;
    }

    try {
        const payload = jsonwebtoken.verify(jwt, config.auth.jwt_public_key);

        if (typeof payload === 'string') {
            next(new BadRequestException('Invalid payload.'));
            return;
        }

        const jwtPayload = tokenPayloadSchema.parse(payload);
        req.user = await userFindByUlidOrThrow(jwtPayload.sub);

        next();
    } catch (error) {
        res.clearCookie('jwt');
        next(error);
    }
};
