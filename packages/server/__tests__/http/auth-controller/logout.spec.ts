import { describe, expect, test } from 'vitest';
import { TestServer } from '@tests/test-server';
import { server } from '@/server';

describe('logout', () => {
    test('logout success', async () => {
        const testServer = new TestServer(server);
        const response = await testServer.deleteJson('/api/auth');

        response.assertNoContent();
        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);
        expect(response.header('set-cookie')?.[0]).toContain('jwt=;');
    });
});
