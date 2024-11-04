import { object, string } from 'zod';

const envParser = object({
    VITE_BASE_URL: string(),
});

export const env = envParser.parse(import.meta.env);
