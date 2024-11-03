import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { DateTime } from 'luxon';
import { object, string } from 'zod';
import { userCreate, userFindByEmail, userUpdate } from '@/database/repositories/user-repository';
import { BadRequestException } from '@/exceptions/bad-request-exception';
import { NotAuthenticatedException } from '@/exceptions/not-authenticated-exception';
import { ValidationException } from '@/exceptions/validation-exception';
import { authMiddleware } from '@/http/middlewares/auth-middleware';
import { UserResource } from '@/http/resources/user-resource';
import { createJwt, JwtCookieMeta } from '@/utilities/auth';

const loginPayload = object({
    email: string().email().min(1, {
        message: 'The email field is required.',
    }),
    password: string().min(1, {
        message: 'The password field is required.',
    }),
});

const registerPayload = object({
    email: string({
        message: 'The email field is required.',
    })
        .email()
        .min(1, {
            message: 'The email field is required.',
        }),
    first_name: string({
        message: 'The first name field is required.',
    }).min(1, {
        message: 'The first name field is required.',
    }),
    last_name: string({
        message: 'The last name field is required.',
    }).min(1, {
        message: 'The last name field is required.',
    }),
    password: string({
        message: 'The password field is required.',
    }).min(1, {
        message: 'The password field is required.',
    }),
    password_confirmation: string(),
}).superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
        ctx.addIssue({
            code: 'custom',
            message: 'The passwords do not match.',
            path: ['password_confirmation'],
        });
    }
});

export const authController = Router();

authController.get('/', authMiddleware, async (req, res, next) => {
    const user = req.user;

    if (!user) {
        res.clearCookie(JwtCookieMeta.name, JwtCookieMeta.options);
        next(new NotAuthenticatedException());
        return;
    }

    const responseData = new UserResource(user).base().create();
    const jwt = createJwt(user);
    res.status(200).cookie(JwtCookieMeta.name, jwt, JwtCookieMeta.options).json(responseData);
});

authController.delete('/', async (_req, res, _next) => {
    res.clearCookie(JwtCookieMeta.name, JwtCookieMeta.options).sendStatus(204);
});

authController.post('/login', async (req, res, next) => {
    const result = loginPayload.safeParse(req.body);

    if (!result.success) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;
    const user = await userFindByEmail(data.email);

    if (!user) {
        next(new BadRequestException('Invalid credentials.'));
        return;
    }

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

    res.status(200).cookie(JwtCookieMeta.name, jwt, JwtCookieMeta.options).json(responseData);
});

authController.post('/register', async (req, res, next) => {
    const result = registerPayload.safeParse(req.body);

    if (!result.success) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;

    if (await userFindByEmail(data.email)) {
        next(new BadRequestException('A user with this email already exists.'));
        return;
    }

    const user = await userCreate({
        email: data.email.trim().toLowerCase(),
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        password: data.password.trim(),
        last_signed_in_at: DateTime.now().toUTC().toISO(),
    });

    const responseData = new UserResource(user).base().create();
    const jwt = createJwt(user);

    res.status(201).cookie(JwtCookieMeta.name, jwt, JwtCookieMeta.options).json(responseData);
});
