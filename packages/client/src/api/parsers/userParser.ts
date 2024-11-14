import { object, type output, string } from 'zod';
import { dateStringToDateTime, nullableStringToDateTime } from '@/api/parsers/utilities/dateStringToDateTime';

export const userParser = object({
    created_at: dateStringToDateTime(),
    first_name: string(),
    id: string(),
    last_name: string(),
    last_signed_in_at: nullableStringToDateTime(),
    updated_at: dateStringToDateTime(),
    username: string(),
});

export type User = output<typeof userParser>;
