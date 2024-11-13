import ky from 'ky';
import { handleGenericHttpError } from '@/api/hooks/handle-generic-http-error';
import { handleValidationHttpError } from '@/api/hooks/handle-validation-http-error';
import { env } from '@/utilities/env';

export function client() {
    return ky.create({
        credentials: 'include',
        hooks: {
            beforeError: [handleValidationHttpError, handleGenericHttpError],
        },
        prefixUrl: env.VITE_BASE_URL,
    });
}
