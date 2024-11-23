import { HttpException } from '@/exceptions/http-exception';

export class NotAuthenticatedException extends HttpException {
    public override readonly name = 'UnauthorizedException';

    public override getStatusCode() {
        return 401;
    }

    protected override getMessage() {
        return 'Not authenticated';
    }
}
