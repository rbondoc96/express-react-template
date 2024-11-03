import { preprocess, type ZodType } from 'zod';

type Wrapped<K extends string> = {
    [k in K]: unknown;
};

function isWrapped<W extends string>(payload: unknown, wrapper: W): payload is Wrapped<W> {
    if (!payload) {
        return false;
    }

    return typeof payload === 'object' && Object.prototype.hasOwnProperty.call(payload, wrapper);
}

export function unwrap<P extends ZodType>(parser: P, wrapper = 'data') {
    return preprocess((payload) => {
        if (!isWrapped(payload, wrapper)) {
            throw new Error(`Response payload was not wrapped with ${wrapper}`);
        }

        return payload[wrapper];
    }, parser);
}
