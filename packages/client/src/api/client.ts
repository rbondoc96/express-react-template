import ky from 'ky';
import { handleValidationHttpError } from '@/api/hooks/handle-validation-http-error';
import { env } from '@/utilities/env';

export function client() {
    return ky.create({
        hooks: {
            beforeError: [handleValidationHttpError],
        },
        prefixUrl: env.VITE_BASE_URL,
    });
}
