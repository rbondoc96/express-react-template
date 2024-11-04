import { vi } from 'vitest';

/**
 * Fixes a `TypeError` when running tests that use `window.matchMedia`
 * @see {@link https://github.com/vitest-dev/vitest/issues/821}
 */
Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation(() => ({
        matches: false,
    })),
});
