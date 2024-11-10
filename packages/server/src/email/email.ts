import { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { config } from '@/config';
import { mailer } from '@/utilities/mailer';

export abstract class Email {
    protected abstract subject(): string;
    protected abstract toAddress(): string;

    protected htmlBody(): string | undefined {
        return undefined;
    }

    protected textBody(): string | undefined {
        return undefined;
    }

    protected options(): SendMailOptions {
        return {
            subject: this.subject(),
            from: config.mail.from_address,
            html: this.htmlBody(),
            text: this.textBody(),
            to: this.toAddress(),
        };
    }

    public async send(): Promise<SentMessageInfo> {
        return await mailer.sendMail(this.options());
    }
}
