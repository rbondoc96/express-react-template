import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { coerce, object, string } from 'zod';
import {
    userCount,
    userCreate,
    userFindByEmailOrThrow,
    userSelectQuery,
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
    email: string().email({
        message: 'A valid email is required.',
    }),
    password: string().min(1, {
        message: 'The password field is required.',
    }),
});

const registerPayload = object({
    email: string().email({
        message: 'A valid email is required.',
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
    res.clearCookie('jwt');
    res.sendStatus(204);
});

authController.post('/login', async (req, res, next) => {
    const result = loginPayload.safeParse(req.body);

    if (result.error) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;
    const user = await userFindByEmailOrThrow(data.email);

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
        next(new BadRequestException('Invalid credentials.'));
        return;
    }

    const responseData = new UserResource(user).base().create();
    const jwt = createJwt(user);

    res.status(200).cookie('jwt', jwt, { httpOnly: true, secure: true, sameSite: 'none' }).json(responseData);
});

authController.post('/register', async (req, res, next) => {
    const result = registerPayload.safeParse(req.body);

    if (result.error) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;
    const user = await userCreate({
        email: data.email.trim(),
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        password: data.password.trim(),
    });

    const responseData = new UserResource(user).base().create();

    res.status(201).json(responseData);
});

authController.get('/users', async (req, res, next) => {
    const result = paginationQueryParams.safeParse(req.query);

    if (result.error) {
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

    const responseData = new UserResource(users).base().pagination(count, query).create();

    res.status(200).json(responseData);
});
