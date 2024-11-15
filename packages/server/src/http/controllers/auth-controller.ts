import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { DateTime } from 'luxon';
import { coerce, object, string } from 'zod';
import {
    userCount,
    userCreate,
    userFindByUsernameOrThrow,
    userSelectQuery,
    userUpdate,
} from '@/database/repositories/user-repository';
import { BadRequestException } from '@/exceptions/bad-request-exception';
import { ValidationException } from '@/exceptions/validation-exception';
import { authMiddleware } from '@/http/middlewares/auth-middleware';
import { UserResource } from '@/http/resources/user-resource';
import { createJwt } from '@/utilities/auth';

const paginationQueryParams = object({
    page: coerce.number().default(1),
    per_page: coerce.number().default(10),
});

const loginPayload = object({
    username: string().min(1, {
        message: 'The username field is required.',
    }),
    password: string().min(1, {
        message: 'The password field is required.',
    }),
});

const registerPayload = object({
    username: string().min(1, {
        message: 'The username field is required.',
    }),
    first_name: string().min(1, {
        message: 'The first name field is required.',
    }),
    last_name: string().min(1, {
        message: 'The last name field is required.',
    }),
    password: string().min(1, {
        message: 'The password field is required.',
    }),
});

export const authController = Router();

authController.get('/', authMiddleware, async (req, res, _next) => {
    const user = req.user;

    if (!user) {
        res.status(401).json({
            success: false,
            message: 'Unauthenticated.',
        });
        return;
    }

    const responseData = new UserResource(user).base().create();
    res.status(200).json(responseData);
});

authController.delete('/', async (_req, res, _next) => {
    res.clearCookie('jwt').sendStatus(204);
});

authController.post('/login', async (req, res, next) => {
    const result = loginPayload.safeParse(req.body);

    if (!result.success) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;
    const user = await userFindByUsernameOrThrow(data.username);

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
        next(new BadRequestException('Invalid credentials.'));
        return;
    }

    await userUpdate(user, {
        last_signed_in_at: DateTime.now().toUTC().toISO(),
    });

    const responseData = new UserResource(user).base().create();
    const jwt = createJwt(user);

    res.status(200)
        .cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        .json(responseData);
});

authController.post('/register', async (req, res, next) => {
    const result = registerPayload.safeParse(req.body);

    if (!result.success) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;
    const user = await userCreate({
        username: data.username.trim().toLowerCase(),
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        password: data.password.trim(),
        last_signed_in_at: DateTime.now().toUTC().toISO(),
    });

    const responseData = new UserResource(user).base().create();
    const jwt = createJwt(user);

    res.status(201).cookie('jwt', jwt, { httpOnly: true, secure: true, sameSite: 'none' }).json(responseData);
});

authController.get('/users', authMiddleware, async (req, res, next) => {
    const result = paginationQueryParams.safeParse(req.query);

    if (!result.success) {
        next(new Error('Invalid query params'));
        return;
    }

    const query = result.data;
    const count = await userCount();

    const users = await userSelectQuery()
        .selectAll()
        .offset(query.page - 1)
        .limit(query.per_page)
        .execute();

    const responseData = new UserResource(users)
        .base()
        .pagination(count, {
            page: query.page,
            per_page: query.per_page,
        })
        .create();

    res.status(200).json(responseData);
});
