export abstract class HttpException extends Error {
    public abstract readonly name: string;

    public abstract getStatusCode(): number;

    protected getMessage(): string | undefined {
        return undefined;
    }

    protected getMessages(): Record<string, unknown> | undefined {
        return undefined;
    }

    public body(): Record<string, unknown> {
        // `undefined` properties are removed in the response.
        return {
            success: false,
            message: this.getMessage(),
            messages: this.getMessages(),
        };
    }
}
