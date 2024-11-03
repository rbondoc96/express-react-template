import { Role } from '@common/enums/Role';
import { Router } from 'express';
import { coerce, nativeEnum, object, string } from 'zod';
import { userCount, userFindByUlid, userSelectQuery, userUpdate } from '@/database/repositories/user-repository';
import { NotFoundException } from '@/exceptions/not-found-exception';
import { ValidationException } from '@/exceptions/validation-exception';
import { authMiddleware } from '@/http/middlewares/auth-middleware';
import { UserResource } from '@/http/resources/user-resource';

const paginationQueryParams = object({
    page: coerce.number().default(1),
    per_page: coerce.number().default(10),
});

const editUserPayload = object({
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
    role: nativeEnum(Role),
    username: string({
        message: 'The username field is required.',
    }).min(1, {
        message: 'The username field is required.',
    }),
});

export const userController = Router();

userController.get('/', authMiddleware, async (req, res, next) => {
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

userController.patch('/:id', authMiddleware, async (req, res, next) => {
    const ulid = req.params.id;

    if (!ulid) {
        next(new NotFoundException());
        return;
    }

    const user = await userFindByUlid(ulid);

    if (!user) {
        next(new NotFoundException());
        return;
    }

    const result = editUserPayload.safeParse(req.body);

    if (!result.success) {
        next(ValidationException.fromZodError(result.error));
        return;
    }

    const updatedUser = await userUpdate(user, result.data);

    const responseData = new UserResource(updatedUser).base().create();
    res.status(200).json(responseData);
});
