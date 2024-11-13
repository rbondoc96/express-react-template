import { type BeforeErrorHook, HTTPError } from 'ky';
import { GenericHttpError } from '@/errors/generic-http-error';
import { isExactError } from '@/utilities/isExactError';

export const handleGenericHttpError: BeforeErrorHook = async (error) => {
    if (!isExactError(error, HTTPError)) {
        return error;
    }

    return await GenericHttpError.from(error);
};
