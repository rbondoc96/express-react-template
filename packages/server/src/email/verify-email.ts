import ejs from 'ejs';
import { UserSelect } from '@/database/repositories/user-repository';
import { Email } from '@/email/email';
import { template } from '@/utilities/template';

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

    protected override async htmlBody(): Promise<string> {
        return await ejs.renderFile(template['verify-email'], { user: this.user });
    }
}
