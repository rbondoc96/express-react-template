import { DateTime } from 'luxon';
import { string } from 'zod';

export function dateStringToDateTime() {
    return string().transform((value) => DateTime.fromISO(value));
}

export function nullableStringToDateTime() {
    return string()
        .nullable()
        .transform((value) => {
            if (value === null) {
                return value;
            }

            const dateTime = DateTime.fromISO(value);

            return dateTime.isValid ? dateTime : null;
        });
}
