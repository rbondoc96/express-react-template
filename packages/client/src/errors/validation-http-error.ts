import { HTTPError } from 'ky';
import { literal, object, record, string } from 'zod';
import { BaseHttpError } from '@/errors/base-http-error';

const responseSchema = object({
    messages: record(string()),
    success: literal(false),
});

export class ValidationHttpError extends BaseHttpError {
    public override readonly name = 'ValidationHttpError';

    constructor(
        error: HTTPError,
        public readonly messages: Record<string, string>,
    ) {
        super(error.response, error.request, error.options);
    }

    public static async from(error: HTTPError): Promise<ValidationHttpError> {
        const payload = await error.response.clone().json();
        const messages = responseSchema.parse(payload).messages;

        return new ValidationHttpError(error, messages);
    }
}
