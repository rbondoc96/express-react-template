import { type RequestHandler } from 'express';
import { DateTime } from 'luxon';

export const logRequestMiddleware: RequestHandler = async (req, _res, next) => {
    const requestMethod = req.method;
    const requestPath = req.path;
    const nowFormatted = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);

    console.log(`[REQUEST ${nowFormatted}]: ${requestMethod} ${requestPath}`);

    next();
};
