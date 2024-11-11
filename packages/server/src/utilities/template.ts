import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __templateDir = join(__dirname, '..', 'templates');

function getTemplate(filename: string): string {
    return join(__templateDir, filename);
}

export const template = {
    ['verify-email']: getTemplate('verify-email.ejs'),
} as const;
