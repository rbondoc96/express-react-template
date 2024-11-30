import { Router } from 'express';
import { coerce, object } from 'zod';
import { userCount, userSelectQuery } from '@/database/repositories/user-repository';
import { authMiddleware } from '@/http/middlewares/auth-middleware';
import { UserResource } from '@/http/resources/user-resource';

const paginationQueryParams = object({
    page: coerce.number().default(1),
    per_page: coerce.number().default(10),
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
