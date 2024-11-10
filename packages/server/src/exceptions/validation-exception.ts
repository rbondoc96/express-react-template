import { type ZodError } from 'zod';
import { HttpException } from '@/exceptions/http-exception';

export class ValidationException extends HttpException {
    public readonly name = 'ValidationException';

    constructor(private readonly error: ZodError) {
        super();
    }

    public override getMessages() {
        const issues = this.error.errors;

        return issues.reduce(
            (acc, issue) => {
                const path = String(issue.path[0]);
                const message = issue.message;

                return {
                    ...acc,
                    [path]: message,
                };
            },
            {} as Record<string, unknown>,
        );
    }

    public override getStatusCode() {
        return 422;
    }
}
