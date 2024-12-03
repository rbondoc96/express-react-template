import { HttpException } from '@/exceptions/http-exception';

export class NotFoundException extends HttpException {
    public override readonly name = 'NotFoundException';

    constructor(public readonly message: string = '') {
        super();
    }

    public override getStatusCode(): number {
        return 404;
    }

    public override getMessage(): string {
        return this.message === '' ? 'The requested resource was not found.' : this.message;
    }
}
