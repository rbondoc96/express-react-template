import { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { config } from '@/config';
import { mailer } from '@/utilities/mailer';

export abstract class Email {
    protected abstract subject(): string;
    protected abstract toAddress(): string;

    protected async htmlBody(): Promise<string | undefined> {
        return undefined;
    }

    protected textBody(): string | undefined {
        return undefined;
    }

    protected async options(): Promise<SendMailOptions> {
        const html = await this.htmlBody();

        return {
            subject: this.subject(),
            from: config.mail.from_address,
            html,
            text: this.textBody(),
            to: this.toAddress(),
        };
    }

    public async send(): Promise<SentMessageInfo> {
        return await mailer.sendMail(await this.options());
    }
}
