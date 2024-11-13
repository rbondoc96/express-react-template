import { type BeforeErrorHook, HTTPError } from 'ky';
import { ValidationHttpError } from '@/errors/validation-http-error';
import { isExactError } from '@/utilities/isExactError';

export const handleValidationHttpError: BeforeErrorHook = async (error) => {
    if (!isExactError(error, HTTPError) || error.response.status !== 422) {
        return error;
    }

    return await ValidationHttpError.from(error);
};
