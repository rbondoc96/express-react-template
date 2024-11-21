import { describe, expect, test } from 'vitest';
import { TestServer } from '@tests/test-server';
import { userCreate } from '@/database/repositories/user-repository';
import { server } from '@/server';

describe('register', () => {
    test('register success', async () => {
        const testServer = new TestServer(server);
        const response = await testServer.postJson('/api/auth/register', {
            first_name: 'Test',
            last_name: 'User',
            username: 'user',
            password: '#Password1234',
        });

        response.assertCreated();

        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);
        expect(response.header('set-cookie')?.[0]).toContain('jwt=');
    });

    test('register with existing username', async () => {
        await userCreate({
            first_name: 'Test',
            last_name: 'User',
            username: 'user',
            password: '#Password1234',
        });

        const testServer = new TestServer(server);
        const response = await testServer.postJson('/api/auth/register', {
            first_name: 'Test',
            last_name: 'User',
            username: 'user',
            password: '#Password1234',
        });

        response.assertBadRequest();
        response.assertJsonError('A user with this username already exists.');
    });

    test.each([
        [
            'first name',
            { last_name: 'User', username: 'user', password: 'password' },
            { first_name: 'The first name field is required.' },
        ],
        [
            'last name',
            { first_name: 'User', username: 'user', password: 'password' },
            { last_name: 'The last name field is required.' },
        ],
        [
            'username',
            { first_name: 'Test', last_name: 'User', password: 'password' },
            { username: 'The username field is required.' },
        ],
        [
            'username',
            { first_name: 'Test', last_name: 'User', username: 'username' },
            { password: 'The password field is required.' },
        ],
    ])('register validation without %s', async (_, body, errors) => {
        const testServer = new TestServer(server);
        const response = await testServer.postJson('/api/auth/register', body);

        response.assertUnprocessable();
        response.assertJsonErrors(errors);
    });
});
