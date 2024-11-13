import { HttpException } from '@/exceptions/http-exception';

export class BadRequestException extends HttpException {
    public override readonly name = 'BadRequestException';

    constructor(public readonly message: string) {
        super();
    }

    public override getStatusCode() {
        return 400;
    }

    protected override getMessage() {
        return this.message;
    }
}
