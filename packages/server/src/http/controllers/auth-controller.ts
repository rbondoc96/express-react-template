import { Router } from 'express';
import { coerce, object, string } from 'zod';
import { userCount, userCreate, userSelectQuery } from '@/database/repositories/user-repository';
import { VerifyEmail } from '@/email/verify-email';
import { ValidationException } from '@/exceptions/validation-exception';
import { UserResource } from '@/http/resources/user-resource';

const paginationQueryParams = object({
    page: coerce.number().default(1),
    per_page: coerce.number().default(10),
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

authController.post('/register', async (req, res, next) => {
    const result = registerPayload.safeParse(req.body);
    req.query;

    if (result.error) {
        next(new ValidationException(result.error));
        return;
    }

    const data = result.data;
    const user = await userCreate({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
    });

    const responseData = new UserResource(user).base().create();

    await new VerifyEmail(user).send();

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