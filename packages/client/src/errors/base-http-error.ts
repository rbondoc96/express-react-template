import { HTTPError } from 'ky';

export abstract class BaseHttpError extends HTTPError {
    public abstract readonly name: string;
}
