import { type ZodError } from 'zod';
import { HttpException } from '@/exceptions/http-exception';

export class ValidationException extends HttpException {
    public readonly name = 'ValidationException';

    constructor(public readonly messages: Record<string, string>) {
        super();
    }

    public static fromZodError(error: ZodError) {
        const issues = error.errors;

        const errors = issues.reduce(
            (acc, issue) => {
                // Zod schemas are expected to have a single depth.
                const path = String(issue.path[0]);
                const message = issue.message;

                return {
                    ...acc,
                    [path]: message,
                };
            },
            {} as Record<string, string>,
        );

        return new ValidationException(errors);
    }

    public override getMessages() {
        return this.messages;
    }

    public override getStatusCode() {
        return 422;
    }
}
