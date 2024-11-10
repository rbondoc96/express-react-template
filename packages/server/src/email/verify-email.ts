import { UserSelect } from '@/database/repositories/user-repository';
import { Email } from '@/email/email';

export class VerifyEmail extends Email {
    constructor(protected readonly user: UserSelect) {
        super();
    }

    protected override subject(): string {
        return 'Verify Your Email';
    }

    protected override toAddress(): string {
        return this.user.email;
    }

    protected override htmlBody(): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>Template</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta name="color-scheme" content="light">
                    <meta name="supported-color-schemes" content="light">
                </head>
                <table style="font-family: Verdana, sans-serif; width: 100%">
                    <tbody>
                        <tr>
                            <td>
                                <h1 style="text-align: center;">Verify Your Email</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </html>
        `;
    }
}
