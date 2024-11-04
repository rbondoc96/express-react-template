import ky from 'ky';
import { env } from '@/utilities/env';

export function client() {
    return ky.create({
        prefixUrl: env.VITE_BASE_URL,
    });
}
