import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { DateTime } from 'luxon';
import { object, string } from 'zod';
import { userCreate, userFindByUsername, userUpdate } from '@/database/repositories/user-repository';
import { BadRequestException } from '@/exceptions/bad-request-exception';
import { NotAuthenticatedException } from '@/exceptions/not-authenticated-exception';
import { ValidationException } from '@/exceptions/validation-exception';
import { authMiddleware } from '@/http/middlewares/auth-middleware';
import { UserResource } from '@/http/resources/user-resource';
import { createJwt } from '@/utilities/auth';

const loginPayload = object({
    username: string().min(1, {
        message: 'The username field is required.',
    }),
    password: string().min(1, {
        message: 'The password field is required.',
    }),
});

const registerPayload = object({
    username: string({
        message: 'The username field is required.',
    }).min(1, {
        message: 'The username field is required.',
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
});

export const authController = Router();

authController.get('/', authMiddleware, async (req, res, next) => {
    const user = req.user;

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        next(new NotAuthenticatedException());
        return;
    }

    const responseData = new UserResource(user).base().create();
    res.status(200).json(responseData);
});

authController.delete('/', async (_req, res, _next) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }).sendStatus(204);
});

authController.post('/login', async (req, res, next) => {
    const result = loginPayload.safeParse(req.body);

    if (!result.success) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const data = result.data;
    const user = await userFindByUsername(data.username);

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

    if (await userFindByUsername(data.username)) {
        next(new BadRequestException('A user with this username already exists.'));
        return;
    }

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
