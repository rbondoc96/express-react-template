import nodemailer from 'nodemailer';
import { config } from '@/config';

export const mailer = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false,
});
