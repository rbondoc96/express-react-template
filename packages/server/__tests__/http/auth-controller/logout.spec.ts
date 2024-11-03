import { describe, expect, test } from 'vitest';
import { TestRequest } from '@tests/test-request';
import { server } from '@/server';

describe('logout', () => {
    test('logout success', async () => {
        // Arrange
        const request = new TestRequest(server);

        // Act
        const response = await request.deleteJson('/api/auth');

        // Assert
        response.assertNoContent();
        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);
        expect(response.header('set-cookie')?.[0]).toContain('jwt=;');
    });
});
