import { describe, expect, test } from 'vitest';
import { UserFactory } from '@tests/factories/user-factory';
import { TestServer } from '@tests/test-server';
import { server } from '@/server';

describe('login', () => {
    test('login success', async () => {
        const testServer = new TestServer(server);
        const user = await new UserFactory().password('#Password1234').create();

        const response = await testServer.postJson('/api/auth/login', {
            username: user.username,
            password: '#Password1234',
        });

        response.assertOk();
        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);
        expect(response.header('set-cookie')?.[0]).toContain('jwt=');
    });

    test('login with non existent user', async () => {
        const testServer = new TestServer(server);
        const response = await testServer.postJson('/api/auth/login', {
            username: 'user',
            password: '#Password1234',
        });

        response.assertBadRequest();
        response.assertJsonError('Invalid credentials.');
    });

    test('login with incorrect password', async () => {
        const testServer = new TestServer(server);
        const user = await new UserFactory().password('#Password1234').create();

        const response = await testServer.postJson('/api/auth/login', {
            username: user.username,
            password: 'wrong_password',
        });

        response.assertBadRequest();
        response.assertJsonError('Invalid credentials.');
    });
});
