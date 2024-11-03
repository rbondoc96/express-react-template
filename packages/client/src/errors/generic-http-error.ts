import { HTTPError } from 'ky';
import { literal, object, string } from 'zod';
import { BaseHttpError } from '@/errors/base-http-error';

const serverErrorSchema = object({
    success: literal(false),
    message: string(),
});

export class GenericHttpError extends BaseHttpError {
    public override readonly name = 'GenericHttpError';

    constructor(
        error: HTTPError,
        public readonly message: string,
    ) {
        super(error.response, error.request, error.options);
    }

    public static async from(error: HTTPError) {
        const data = await error.response.clone().json();
        const result = serverErrorSchema.parse(data);

        return new GenericHttpError(error, result.message);
    }
}
