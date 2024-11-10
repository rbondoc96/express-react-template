import { type ErrorRequestHandler } from 'express';
import { HttpException } from '@/exceptions/http-exception';

export const errorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
    if (err instanceof HttpException) {
        res.status(err.getStatusCode()).json(err.body());
        return;
    }

    if (err instanceof Error) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: 'An unexpected error has occurred.',
    });
};
