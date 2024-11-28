import { type RequestHandler } from 'express';

export const logRequestMiddleware: RequestHandler = async (req, _res, next) => {
    const requestMethod = req.method;
    const requestPath = req.path;

    console.log(`[REQUEST]: ${requestMethod} ${requestPath}`);

    next();
};
