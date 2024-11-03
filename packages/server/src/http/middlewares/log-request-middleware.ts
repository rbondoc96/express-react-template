import { type RequestHandler } from 'express';
import { DateTime } from 'luxon';
import { config } from '@/config';

export const logRequestMiddleware: RequestHandler = async (req, _res, next) => {
    if (config.app.env === 'development') {
        const requestMethod = req.method;
        const requestPath = req.path;
        const nowFormatted = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);

        console.log(`[REQUEST ${nowFormatted}]: ${requestMethod} ${requestPath}`);
    }

    next();
};
